import React from "react";
import { IProduct } from "../../types";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Rating from "../Rating";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/slice";

interface IProductProps {
  product: IProduct;
}
const Product: React.FC<IProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const addToCart = () => dispatch(addItem(product));

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
        <Button className="btn-primary" onClick={addToCart}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
