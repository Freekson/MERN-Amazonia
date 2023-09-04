import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import data from "../../data";

const Home: React.FC = () => {
  return (
    <Layout>
      <h1>Featured products</h1>
      <div className="products">
        {data.products.map((product) => (
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
        ))}
      </div>
    </Layout>
  );
};

export default Home;
