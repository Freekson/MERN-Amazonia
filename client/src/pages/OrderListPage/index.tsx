import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchAdminOrders } from "../../redux/order/slice";
import { getError } from "../../utils/getError";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UpdatedOrder } from "../../redux/order/types";

const OrderListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { status, orders } = useSelector((state: RootState) => state.orders);
  const [error, setError] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchAdminOrders({ token: user?.token }));
      } catch (err) {
        setError(getError(err));
      }
      if (isDeleted) {
        setIsDeleted(false);
      } else {
        dispatch(fetchAdminOrders({ token: user?.token }));
      }
    };
    fetchData();
  }, [dispatch, isDeleted, user]);

  const deleteHandler = async (order: UpdatedOrder) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        setIsDeleted(true);
        await axios.delete(`/api/orders/${order._id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setError("");
        setIsDeleted(false);
      } catch (err) {
        setError(getError(err));
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin Orders</title>
      </Helmet>
      <h1>Orders</h1>
      {status === "loading" ? (
        <LoadingBox />
      ) : status === "error" ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : "USER DELETED"}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
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
                    Details
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      deleteHandler(order);
                    }}
                  >
                    Delete
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

export default OrderListPage;
