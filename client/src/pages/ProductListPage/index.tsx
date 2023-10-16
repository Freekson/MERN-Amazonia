import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { getError } from "../../utils/getError";
import { fetchAdminProducts } from "../../redux/product/slice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { IProduct } from "../../types";

const ProductListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user } = useSelector((state: RootState) => state.user);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (user?.token) {
      try {
        dispatch(fetchAdminProducts({ token: user.token, page: Number(page) }));
        setError("");
      } catch (err) {
        setError(getError(err));
      }
      if (isDeleted) {
        setIsDeleted(false);
      } else {
        dispatch(fetchAdminProducts({ token: user.token, page: Number(page) }));
      }
    }
  }, [dispatch, isDeleted, page, user]);

  const { status, products, pages } = useSelector(
    (state: RootState) => state.products
  );

  const createHandler = async () => {
    if (window.confirm("Are you sure to create?")) {
      try {
        const { data } = await axios.post(
          "/api/products",
          {},
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        console.log(getError(err));
      }
    }
  };

  const deleteHandler = async (product: IProduct) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        setIsDeleted(true);
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setError("");
        setIsDeleted(false);
      } catch (err) {
        setError(getError(err));
      }
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Admin Products</title>
      </Helmet>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              Create Product
            </Button>
          </div>
        </Col>
      </Row>
      {status === "loading" ? (
        <LoadingBox />
      ) : status === "error" ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="flex-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bottom-element">
            {Array.from({ length: pages || 1 }, (_, index) => (
              <Link
                className={index + 1 === Number(page) ? "btn text-bold" : "btn"}
                key={index + 1}
                to={`/admin/products?page=${index + 1}`}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductListPage;
