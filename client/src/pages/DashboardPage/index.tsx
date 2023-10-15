import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { getError } from "../../utils/getError";
import { fetchDashboard } from "../../redux/dashboard/slice";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Card, Col, Row } from "react-bootstrap";

const DashboardPage: React.FC = () => {
  const [error, setError] = useState("");
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.token) {
      try {
        dispatch(fetchDashboard({ token: user.token }));
      } catch (err) {
        setError(getError(err));
      }
    }
  }, [dispatch, user]);

  const { summary, status } = useSelector(
    (state: RootState) => state.dashboard
  );

  return (
    <Layout>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      {status === "loading" ? (
        <LoadingBox />
      ) : status === "error" ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {summary.users && summary.users[0]
                    ? summary.users[0].numUsers
                    : 0}
                </Card.Title>
                <Card.Text>Users</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {summary.orders && summary.users[0]
                    ? summary.orders[0].numOrders
                    : 0}
                </Card.Title>
                <Card.Text>Orders</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  $
                  {summary.orders && summary.users[0]
                    ? summary.orders[0].totalSales
                    : 0}
                </Card.Title>
                <Card.Text>Orders</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default DashboardPage;
