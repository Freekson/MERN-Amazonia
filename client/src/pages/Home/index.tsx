import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface IProduct {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  countInStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
}
interface Idata {
  products: IProduct[];
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Idata>({ products: [] });
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/products");
      setProducts({ products: res.data });
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <h1>Featured products</h1>
      <div className="products">
        {products.products?.map((product) => (
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
