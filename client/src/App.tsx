import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:slug" element={<Product />}></Route>
      </Routes>
    </div>
  );
}

export default App;
