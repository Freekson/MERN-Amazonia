import express from "express";
import data from "./data.js";
import cors from "cors";

const app = express();
app.use(cors());

// 1 par - path, 2 par - function called when user on it path
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

//path for product
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: " Product not found" });
  }
});

//define port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
