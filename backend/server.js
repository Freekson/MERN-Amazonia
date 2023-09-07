import express from "express";
import data from "./data.js";
import cors from "cors";

const app = express();
app.use(cors());

// 1 par - path, 2 par - function called when user on it path
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

//define port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
