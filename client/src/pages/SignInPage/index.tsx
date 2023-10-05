import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { RootState, useAppDispatch } from "../../redux/store";
import { singIn } from "../../redux/user/slice";
import MessageBox from "../../components/MessageBox";
import { useSelector } from "react-redux";

const SingInPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user } = useSelector((state: RootState) => state.user);

  const redicretUrl = new URLSearchParams(search).get("redirect");
  const redirect = redicretUrl ? redicretUrl : "/";

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent reloading page, when clicked on submit btn
    try {
      const { data } = await axios.post("/api/users/singin", {
        email,
        password,
      });
      dispatch(singIn(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <Layout>
      <Container className="small-container">
        <Helmet>
          <title>Sing In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sing In</Button>
          </div>
          <div className="mb-3">
            New Customer?{" "}
            <Link to={`/singup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </Form>
        {error ? (
          <MessageBox variant="danger">{error ? error + " 😕" : ""}</MessageBox>
        ) : (
          ""
        )}
      </Container>
    </Layout>
  );
};

export default SingInPage;
