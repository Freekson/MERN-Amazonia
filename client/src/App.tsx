import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SingInPage from "./pages/SignInPage";
import ShippingPage from "./pages/ShippingPage";
import SingUpPage from "./pages/SignUpPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product/:slug" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/singin" element={<SingInPage />}></Route>
        <Route path="/singup" element={<SingUpPage />}></Route>
        <Route path="/shipping" element={<ShippingPage />}></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/placeorder" element={<PlaceOrderPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
