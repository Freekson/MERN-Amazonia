import React from "react";
import { IProduct } from "../../types";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Rating from "../Rating";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cart/slice";
import { RootState } from "../../redux/store";

//TODO: тут нужно заимпортить слайс с продуктами, но сначала переписать код в HomePage
interface IProductProps {
  product: IProduct;
}
const Product: React.FC<IProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem(product));
  };
  const id: number = Number(product._id);
  console.log(id);

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
        {product.countInStock === product.quantity ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button className="btn-primary" onClick={addToCart}>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
