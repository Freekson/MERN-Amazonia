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
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import AdminRoute from "./components/AdminRoute";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import MapPage from "./pages/MapPage";

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
        <Route path="/search" element={<SearchPage />}></Route>

        {/* //! User routs */}

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/orderhistory"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        ></Route>

        {/* //! Admin routs */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardPage />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductListPage />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/product/:id"
          element={
            <AdminRoute>
              <ProductEditPage />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderListPage />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserListPage />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/admin/user/:id"
          element={
            <AdminRoute>
              <UserEditPage />
            </AdminRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
