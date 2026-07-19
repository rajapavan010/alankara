import "./App.css";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import ScrollToHash from "./components/ScrollToHash";

import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";

import StoreLayout from "./layouts/StoreLayout";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import AdminLayout from "./admin/components/AdminLayout";

import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Newsletter from "./admin/pages/Newsletter";
import Settings from "./admin/pages/Settings";
import AdminLogin from "./admin/pages/AdminLogin";


function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToHash />

        <Routes>
          {/* Customer Website */}
          <Route element={<StoreLayout />}>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/shop"
              element={<ShopPage />}
            />

            <Route
              path="/product/:slug"
              element={<ProductPage />}
            />

            <Route
              path="/checkout"
              element={<CheckoutPage />}
            />

            <Route
              path="/about"
              element={<AboutPage />}
            />
          </Route>

          {/* Admin Login */}
<Route
  path="/admin"
  element={<AdminLogin />}
/>

{/* Admin Panel */}
<Route
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="/admin/dashboard"
    element={<Dashboard />}
  />

  <Route
    path="/admin/products"
    element={<Products />}
  />

  <Route
    path="/admin/orders"
    element={<Orders />}
  />

  <Route
    path="/admin/newsletter"
    element={<Newsletter />}
  />

  <Route
    path="/admin/settings"
    element={<Settings />}
  />
</Route>
<Route
  path="*"
  element={<HomePage />}
/>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;