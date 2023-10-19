import React, { FormEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { getError } from "../../utils/getError";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Button, Container, Form } from "react-bootstrap";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const params = useParams();
  const { id: userId } = params;
  const { user: userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo) {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setIsAdmin(data.isAdmin);
          setEmail(data.email);
          setName(data.name);
          setIsLoading(false);
        } catch (err) {
          setError(getError(err));
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInfo) {
      try {
        setIsLoading(true);
        await axios.put(
          `/api/users/${userId}`,
          { _id: userId, name, email, isAdmin },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        setIsLoading(false);
        navigate("/admin/users");
      } catch (err) {
        setError(getError(err));
        setIsLoading(false);
      }
    }
  };
  return (
    <Layout>
      {" "}
      <Helmet>
        <title>Edit User ${userId}</title>
      </Helmet>
      <Container className="small-container">
        <h1>Edit User {userId}</h1>
        {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Check
              className="mb-3"
              type="checkbox"
              id="isAdmin"
              label="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />

            <div className="mb-3">
              <Button type="submit" disabled={isLoading}>
                Update
              </Button>
              {isLoading && <LoadingBox />}
            </div>
          </Form>
        )}
      </Container>
    </Layout>
  );
};

export default UserEditPage;
