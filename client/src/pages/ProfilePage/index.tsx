import React, { FormEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";
import { Button, Form } from "react-bootstrap";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getError } from "../../utils/getError";
import axios from "axios";
import { setUser } from "../../redux/user/slice";
import MessageBox from "../../components/MessageBox";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/singin");
    }
  }, [navigate, user]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match ");
        setIsSuccess(false);
      } else {
        const { data } = await axios.put(
          "api/users/profile",
          {
            name,
            email,
            password,
          },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        dispatch(setUser(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        setError("");
        setIsSuccess(true);
      }
    } catch (err) {
      setError(getError(err));
      setIsSuccess(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <div className="container small-container">
        <h1 className="my-3">User Profile</h1>
        <form onSubmit={submitHandler}>
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
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Update</Button>
          </div>
        </form>
        {error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : isSuccess ? (
          <MessageBox variant="success">User updated successfully</MessageBox>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
