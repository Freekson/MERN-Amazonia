import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getError } from "../../utils/getError";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const ProductEditPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setQuantity(data.quantity);
        setBrand(data.brand);
        setDescription(data.description);
        setIsLoading(false);
      } catch (err) {
        setError(getError(err));
        setIsLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          quantity,
          category,
          brand,
          countInStock,
          description,
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setIsLoading(false);
      navigate("/admin/products");
    } catch (err) {
      setError(getError(err));
      setIsLoading(false);
    }
  };

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      try {
        setIsLoadingUpload(true);
        const { data } = await axios.post("/api/upload", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${user?.token}`,
          },
        });
        setIsLoadingUpload(false);
        setImage(data.secure_url);
      } catch (err) {
        setError(getError(err));
        setIsLoadingUpload(false);
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Edit Product ${productId}</title>
      </Helmet>
      <Container className="small-container">
        <h1>Edit Product {productId}</h1>
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
            <Form.Group className="mb-3" controlId="slug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {isLoadingUpload && <LoadingBox />}
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
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

export default ProductEditPage;
