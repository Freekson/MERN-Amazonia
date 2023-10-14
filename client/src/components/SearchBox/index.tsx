import React, { FormEvent, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };
  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="query"
          id="query"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
