import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import MessageBox from "../../components/MessageBox";
import LoadingBox from "../../components/LoadingBox";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { deliverOrder, fetchOrder, setIsPaid } from "../../redux/order/slice";
import axios from "axios";
import {
  PayPalButtons,
  ReactPayPalScriptOptions,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { getError } from "../../utils/getError";

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id: orderId } = params;
  const { user } = useSelector((state: RootState) => state.user);
  const { orders, status } = useSelector((state: RootState) => state.orders);
  const [error, setError] = useState("");
  const [successPay, setSuccessPay] = useState(false);
  const [isDeliverLoading, setIsDeliverLoading] = useState(false);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const order = orders[0];
  const token = user?.token;

  useEffect(() => {
    const fetchData = async () => {
      if (orderId) {
        try {
          dispatch(fetchOrder({ orderId, token }));
        } catch (err) {}
      }
    };
    if (!user) {
      return navigate("/singin");
    }
    if (
      !order?._id ||
      successPay ||
      isDeliverLoading ||
      (order?._id && order?._id !== orderId)
    ) {
      fetchData();
      setSuccessPay(false);
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        const paypalOptions: ReactPayPalScriptOptions = {
          currency: "USD",
          clientId: clientId,
        };
        paypalDispatch({
          type: "resetOptions",
          value: paypalOptions,
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending" as SCRIPT_LOADING_STATE,
        });
      };

      loadPaypalScript();
    }
  }, [
    dispatch,
    isDeliverLoading,
    navigate,
    order,
    orderId,
    paypalDispatch,
    successPay,
    token,
    user,
  ]);

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderId: string) => {
        return orderId;
      });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      try {
        await axios.put(`/api/orders/${order._id}/pay`, details, {
          headers: { authorization: `Bearer ${user?.token}` },
        });
        if (user) {
          dispatch(setIsPaid(user._id));
        }
        setSuccessPay(true);
      } catch (err) {
        setError(getError(err));
      }
    });
  };

  const onError = (err: any) => {
    setError(getError(err));
  };

  const deliverOrderHandler = async () => {
    try {
      setIsDeliverLoading(true);
      if (user) {
        dispatch(deliverOrder({ orderId: order._id, token: user?.token }));
      }
      setIsDeliverLoading(false);
    } catch (err) {
      setError(getError(err));
      setIsDeliverLoading(false);
    }
  };
  return (
    <Layout>
      {status === "loading" ? (
        <LoadingBox></LoadingBox>
      ) : status === "error" ? (
        <MessageBox variant="danger">An error occurred 😕</MessageBox>
      ) : (
        <div>
          <Helmet>
            <title>Order {orderId}</title>
          </Helmet>
          <h1 className="my-3">Order {orderId}</h1>
          <Row>
            <Col md={8}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Shipping</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {order?.shippingAddress.fullName}{" "}
                    <br />
                    <strong>Address:</strong> {order?.shippingAddress.address},{" "}
                    {order?.shippingAddress.city},{" "}
                    {order?.shippingAddress.postCode},{" "}
                    {order?.shippingAddress.country}
                  </Card.Text>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Delivered at {order?.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not deliverd</MessageBox>
                  )}
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong>Method:</strong> {order?.paymentMethod}
                  </Card.Text>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order?.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                          <Col md={6}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded img-thumbnail placeorder-img "
                            />
                            <Link to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={3}>
                            <span>{item.quantity}</span>
                          </Col>
                          <Col md={3}>${item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong>Order Total</strong>
                        </Col>
                        <Col>${order.totalPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    {!order.isPaid && order.paymentMethod === "PayPal" ? (
                      <ListGroup.Item>
                        {isPending ? (
                          <LoadingBox />
                        ) : (
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            />
                            {error !== "" ? (
                              <MessageBox variant="danger">{error}</MessageBox>
                            ) : successPay ? (
                              <MessageBox variant="success ">
                                Order is paid
                              </MessageBox>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </ListGroup.Item>
                    ) : (
                      ""
                    )}
                    {user?.isAdmin && order.isPaid && !order.isDelivered && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          {isDeliverLoading ? (
                            <LoadingBox />
                          ) : (
                            <Button type="button" onClick={deliverOrderHandler}>
                              Deliver Order
                            </Button>
                          )}
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default OrderPage;
