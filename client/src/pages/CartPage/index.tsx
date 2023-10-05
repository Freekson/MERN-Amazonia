import React from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import MessageBox from "../../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { addItem, clear, minusItem } from "../../redux/cart/slice";
import { IProduct } from "../../types";

const CartPage: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = (item: IProduct) => {
    dispatch(addItem(item));
  };
  const minusCart = (item: IProduct) => {
    dispatch(minusItem(item));
  };
  const clearCart = (item: IProduct) => {
    dispatch(clear(item));
  };
  const checkoutHandler = () => {
    navigate("/singin?redirect=/shipping");
  };
  return (
    <Layout>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="mb-5">Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => minusCart(item)}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span> {item.quantity} </span>{" "}
                      <Button
                        onClick={() => addToCart(item)}
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light" onClick={() => clearCart(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    {cartItems.length === 0
                      ? "You don't have items in cart"
                      : `Subtotal (${cartItems.reduce(
                          (a, c) => a + c.quantity,
                          0
                        )}
                      items ) : 
                      $${cartItems.reduce(
                        (a, c) => a + c.price * c.quantity,
                        0
                      )}`}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default CartPage;
