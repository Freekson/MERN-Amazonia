import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { getError } from "../../utils/getError";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { TUser } from "../../types";
import { Button } from "react-bootstrap";

const UserListPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<TUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user: userInfo } = useSelector((state: RootState) => state.user);
  const [error, setError] = useState("");
  const [isSuccessDelete, setIsSuccessDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo) {
        try {
          setIsLoading(true);
          const { data } = await axios.get("/api/users", {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setUsers(data);
          setIsLoading(false);
          setError("");
        } catch (err) {
          setError(getError(err));
          setUsers([]);
          setIsLoading(false);
        }
      }
    };
    if (isSuccessDelete) {
      setIsSuccessDelete(false);
    } else {
      fetchData();
    }
    fetchData();
  }, [isSuccessDelete, userInfo]);

  const deleteHandlet = async (user: TUser) => {
    if (window.confirm("Are you sure to delete?")) {
      if (userInfo) {
        try {
          setIsLoading(true);
          await axios.delete(`/api/users/${user._id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setIsLoading(false);
        } catch (err) {
          setError(getError(err));
          setIsLoading(false);
          setIsSuccessDelete(false);
        }
      }
    }
    setIsSuccessDelete(true);
  };
  return (
    <Layout>
      <Helmet>
        <title>Admin Users</title>
      </Helmet>
      <h1>Admin Users</h1>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => navigate(`/admin/user/${user._id}`)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteHandlet(user)}
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

export default UserListPage;
