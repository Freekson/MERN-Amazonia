import React, { FormEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import CheckoutSteps from "../../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../redux/user/slice";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userAddress, userPaymentMethod } = useSelector(
    (state: RootState) => state.user
  );
  const [paymentMethod, setPaymentMethod] = useState(
    userPaymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!userAddress?.address) {
      navigate("/shipping");
    }
  }, [navigate, userAddress?.address]);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    localStorage.setItem("paymentMethod", paymentMethod);
    navigate("/placeorder");
  };
  return (
    <Layout>
      <CheckoutSteps step3 />
      <div className="container small-container mt-4">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button
              type="button"
              className="back-btn"
              onClick={() => {
                navigate("/shipping");
              }}
            >
              Go Back
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default PaymentPage;
