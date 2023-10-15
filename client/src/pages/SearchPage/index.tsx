import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchData } from "../../redux/product/slice";
import { getError } from "../../utils/getError";
import { Helmet } from "react-helmet-async";
import { Button, Col, Row } from "react-bootstrap";
import Rating from "../../components/Rating";
import { useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Product from "../../components/Product";
import { LinkContainer } from "react-router-bootstrap";
import { fetchCategories } from "../../redux/category/slice";

type FilterType = {
  page?: string;
  category?: string;
  query?: string;
  rating?: string;
  price?: string;
  order?: string;
};

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [
  {
    name: " & up",
    rating: 4,
  },

  {
    name: " & up",
    rating: 3,
  },

  {
    name: " & up",
    rating: 2,
  },

  {
    name: " & up",
    rating: 1,
  },
];

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || "1";
  const [error, setError] = useState("");
  const products = useSelector((state: RootState) => state.products.products);
  const { status, countProducts, pages } = useSelector(
    (state: RootState) => state.products
  );
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    try {
      dispatch(fetchData({ query, category, price, rating, order, page }));
      setError("");
    } catch (err) {
      setError(getError(err));
    }
  }, [category, dispatch, order, page, price, query, rating]);

  useEffect(() => {
    try {
      dispatch(fetchCategories());
      setError("");
    } catch (err) {
      setError(getError(err));
    }
  }, [dispatch]);

  const getFilterUrl = (filter: FilterType) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;

    return `?page=${filterPage}&query=${filterQuery}&category=${filterCategory}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}`;
  };

  return (
    <Layout>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <div>
            <h3>Department</h3>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "text-bold" : ""}
                  to={{
                    pathname: "/search",
                    search: getFilterUrl({ category: "all" }),
                  }}
                >
                  Any
                </Link>
              </li>
              {categories.map((item, index) => (
                <li key={index}>
                  <Link
                    className={String(item) === category ? "text-bold" : ""}
                    to={{
                      pathname: "/search",
                      search: getFilterUrl({ category: String(item) }),
                    }}
                  >
                    {String(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={"all" === price ? "text-bold" : ""}
                  to={{
                    pathname: "/search",
                    search: getFilterUrl({ price: "all" }),
                  }}
                >
                  Any
                </Link>
              </li>
              {prices.map((p, index) => (
                <li key={index}>
                  <Link
                    className={p.value === price ? "text-bold" : ""}
                    to={{
                      pathname: "/search",
                      search: getFilterUrl({ price: p.value }),
                    }}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Customer Review</h3>
            <ul>
              <li>
                <Link
                  className={"all" === rating ? "text-bold" : ""}
                  to={{
                    pathname: "/search",
                    search: getFilterUrl({ rating: "all" }),
                  }}
                >
                  Any
                </Link>
              </li>
              {ratings.map((r, index) => (
                <li key={index}>
                  <Link
                    className={r.rating === Number(rating) ? "text-bold" : ""}
                    to={{
                      pathname: "/search",
                      search: getFilterUrl({ rating: String(r.rating) }),
                    }}
                  >
                    <Rating caption={r.name} rating={r.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {status === "loading" ? (
            <LoadingBox />
          ) : status === "error" ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? "No" : countProducts} Results
                    {query !== "all" && " : " + query}
                    {category !== "all" && " : " + category}
                    {price !== "all" && " : " + price}
                    {rating !== "all" && " : " + rating}
                    {query !== "all" ||
                    category !== "all" ||
                    rating !== "all" ||
                    price !== "all" ? (
                      <Button
                        variant="light"
                        onClick={() => navigate("/search")}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col className="text-end">
                  Sort by{" "}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(
                        "/search" + getFilterUrl({ order: e.target.value })
                      );
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Most Rated</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {products &&
                  products.map((product, index) => (
                    <Col sm={6} lg={4} className="mb-3" key={product.slug}>
                      <Product product={product}></Product>
                    </Col>
                  ))}
              </Row>
              <div>
                {pages
                  ? Array.from({ length: pages }, (_, index) => (
                      <LinkContainer
                        key={index + 1}
                        className="mx-1"
                        to={{
                          pathname: "/search",
                          search: getFilterUrl({ page: String(index + 1) }),
                        }}
                      >
                        <Button
                          className={
                            Number(page) === index + 1 ? "text-bold" : ""
                          }
                          value="light"
                        >
                          {index + 1}
                        </Button>
                      </LinkContainer>
                    ))
                  : ""}
              </div>
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default SearchPage;
