import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { useNavigate } from "react-router-dom";
import { getError } from "../../utils/getError";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchOrders } from "../../redux/order/slice";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const OrderHistoryPage: React.FC = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { orders, status } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.token) {
          const token = user.token;
          dispatch(fetchOrders({ token }));
        }
      } catch (err) {
        setError(getError(err));
      }
    };
    fetchData();
  }, [dispatch, user?.token]);

  return (
    <Layout>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {status === "loading" ? (
        <LoadingBox />
      ) : status === "error" ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>Paid</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt && order?.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid && order.paidAt
                    ? order.paidAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  {order.isDelivered && order.deliveredAt
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Deatails
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default OrderHistoryPage;
