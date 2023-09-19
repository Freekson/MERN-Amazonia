import Layout from "../../components/Layout";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { IProduct } from "../../types";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

interface IState {
  loading: boolean;
  products: IProduct[] | null;
  error: string;
}

type TAction =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: IProduct[] }
  | { type: "FETCH_FAIL"; payload: string };

const initialState: IState = {
  loading: true,
  products: null,
  error: "",
};

const reducer = (state: IState, action: TAction) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (err: any) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>Amazonia</title>
      </Helmet>
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products &&
              products?.map((product) => (
                <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default Home;
