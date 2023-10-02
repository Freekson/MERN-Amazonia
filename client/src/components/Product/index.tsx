import React from "react";
import { IProduct } from "../../types";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cart/slice";
import { RootState } from "../../redux/store";

interface IProductProps {
  product: IProduct;
}
const Product: React.FC<IProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: RootState) => state.cart);

  const addToCart = () => {
    dispatch(addItem(product));
  };

  const item = cartItems.find((item) => item._id === product._id);
  const inStock = !(product.countInStock === item?.quantity);

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price}$</Card.Text>
        {inStock ? (
          <Button className="btn-primary" onClick={addToCart}>
            {item === undefined ? "Add to Cart" : `In cart: ${item.quantity}`}
          </Button>
        ) : (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
