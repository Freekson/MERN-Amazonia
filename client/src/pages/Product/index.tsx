import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IProduct } from "../../types";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { getError } from "../../utils/getError";

interface IState {
  loading: boolean;
  product: IProduct | null;
  error: string;
}

type TAction =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: IProduct }
  | { type: "FETCH_FAIL"; payload: string };

const initialState: IState = {
  loading: true,
  product: null,
  error: "",
};

const reducer = (state: IState, action: TAction) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Product: React.FC = () => {
  const { slug } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, product } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (err: any) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);
  return (
    <Layout>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={product?.image}
                alt={product?.name}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Helmet>
                    <title>{product?.name}</title>
                  </Helmet>
                  <h1>{product?.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product?.rating}
                    numReviews={product?.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: {product?.price}$</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
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
                        <Col>${product?.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product && product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="dabges">Unaviable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product && product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button variant="primary">Add to cart</Button>
                        </div>
                      </ListGroup.Item>
                    )}
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

export default Product;
