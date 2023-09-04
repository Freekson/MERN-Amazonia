import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";

const Product: React.FC = () => {
  const { slug } = useParams();
  return (
    <Layout>
      <h1>{slug}</h1>
    </Layout>
  );
};

export default Product;
