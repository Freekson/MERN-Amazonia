import { useEffect } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { addItem } from "../../redux/cart/slice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchProduct } from "../../redux/product/slice";

const ProductPage: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const { products, status } = useSelector(
    (state: RootState) => state.products
  );

  const addToCart = () => {
    dispatch(addItem(products[0]));
  };

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        dispatch(fetchProduct({ slug }));
      };
      fetchData();
    }
  }, [dispatch, slug]);

  const item = cartItems.find((item) => item._id === products[0]?._id);
  const inStock = !(products[0]?.countInStock === item?.quantity);

  return (
    <Layout>
      {status === "loading" ? (
        <LoadingBox />
      ) : status === "error" ? (
        <MessageBox variant="danger">An error occurred 😕</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={products[0]?.image}
                alt={products[0]?.name}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{products[0]?.name}</title>
                  </Helmet>
                  <h1>{products[0]?.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={products[0]?.rating}
                    numReviews={products[0]?.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: {products[0]?.price}$</ListGroup.Item>
                <ListGroup.Item>
                  Description: {products[0]?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${products[0]?.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {inStock ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unaviable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="d-grid">
                        {inStock ? (
                          <Button className="btn-primary" onClick={addToCart}>
                            {item === undefined
                              ? "Add to Cart"
                              : `In cart: ${item.quantity}`}
                          </Button>
                        ) : (
                          <Button variant="light" disabled>
                            Out of stock
                          </Button>
                        )}
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default ProductPage;
