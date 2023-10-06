import React from "react";
import { Col, Row } from "react-bootstrap";

type TProps = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};

const CheckoutSteps: React.FC<TProps> = ({ step1, step2, step3, step4 }) => {
  if (step2) {
    step1 = true;
  }
  if (step3) {
    step1 = true;
    step2 = true;
  }
  if (step4) {
    step1 = true;
    step2 = true;
    step3 = true;
  }
  return (
    <Row className="checkout-steps">
      <Col className={step1 ? "active" : ""}>Sing-In</Col>
      <Col className={step2 ? "active" : ""}>Shipping</Col>
      <Col className={step3 ? "active" : ""}>Payment</Col>
      <Col className={step4 ? "active" : ""}>Place Order</Col>
    </Row>
  );
};

export default CheckoutSteps;
