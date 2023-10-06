import React, { FormEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";
import { RootState, useAppDispatch } from "../../redux/store";
import { saveShippingAddress } from "../../redux/user/slice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps";

const ShippingPage: React.FC = () => {
  const { userAddress, user } = useSelector((state: RootState) => state.user);
  const [fullName, setFullName] = useState(userAddress?.fullName);
  const [address, setAddress] = useState(userAddress?.address);
  const [city, setCity] = useState(userAddress?.city);
  const [postCode, setPostCode] = useState(userAddress?.postCode);
  const [country, setCountry] = useState(userAddress?.country);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/singin?redirect=/shipping");
    }
  }, [navigate, user]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postCode, country })
    );
    localStorage.setItem(
      "userShippingAddress",
      JSON.stringify({ fullName, address, city, postCode, country })
    );
    navigate("/payment");
  };
  return (
    <Layout>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step2 />
      <div className="container small-container mt-4">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postCode">
            <Form.Label>Post Code</Form.Label>
            <Form.Control
              value={postCode}
              onChange={(e) => {
                setPostCode(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button
              type="button"
              className="back-btn"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Go Back
            </Button>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default ShippingPage;
