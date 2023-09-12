import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { IProduct } from "../../types";
import logger from "use-reducer-logger";

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
  products: null, // Замените на начальное значение для продуктов
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
  const [state, dispatch] = useReducer(logger(reducer), initialState);
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
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Eror {error}</div>
        ) : (
          products &&
          products?.map((product) => (
            <div key={product.slug} className="product">
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product__info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>{product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Home;
