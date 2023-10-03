import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

const SignInPage = () => {
  const { search } = useLocation();
  const redicretUrl = new URLSearchParams(search).get("redirect");
  const redirect = redicretUrl ? redicretUrl : "/";
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sing In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sing In</Button>
        </div>
        <div className="mb-3">
          New Customer?{" "}
          <Link to={`/singup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
