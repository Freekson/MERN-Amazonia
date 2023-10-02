import Layout from "../../components/Layout";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { fetchProducts } from "../../redux/product/slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProducts());
    };
    fetchData();
  }, [dispatch]);
  return (
    <Layout>
      <Helmet>
        <title>Amazonia</title>
      </Helmet>
      <h1>Featured products</h1>
      <div className="products">
        {status === "loading" ? (
          <LoadingBox />
        ) : status === "error" ? (
          <MessageBox variant="danger">An error occurred 😕</MessageBox>
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

export default HomePage;
