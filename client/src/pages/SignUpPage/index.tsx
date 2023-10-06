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
import { getError } from "../../utils/getError";

const SingUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/singup", {
        name,
        email,
        password,
      });
      dispatch(singIn(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err: any) {
      setError(getError(err));
    }
  };

  return (
    <Layout>
      <Container className="small-container">
        <Helmet>
          <title>Sing Up</title>
        </Helmet>
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sing Up</Button>
          </div>
          <div className="mb-3">
            Already have an account?{" "}
            <Link to={`/singin?redirect=${redirect}`}>Sing-Up</Link>
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

export default SingUpPage;
