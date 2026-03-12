import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashPage from "./presentation/pages/splash/splash.page.jsx";
import HomePage from "./presentation/pages/home/home.page.jsx";
import LoginPage from "./presentation/pages/auth/login.page.jsx";
import RegisterPage from "./presentation/pages/auth/register.page.jsx";
import ProductsPage from "./presentation/pages/products/products.page.jsx";
import ProductDetailPage from "./presentation/pages/products/product.detail.page.jsx";
import CartPage from "./presentation/pages/cart/cart.page.jsx";
import CheckoutPage from "./presentation/pages/checkout/checkout.page.jsx";
import OrdersPage from "./presentation/pages/orders/orders.page.jsx";
import WishlistPage from "./presentation/pages/wishlist/wishlist.page.jsx";
import VendorAuthPage from "./presentation/pages/vendor/vendor.auth.page.jsx";
import VendorDashboardPage from "./presentation/pages/vendor/vendor.dashboard.page.jsx";
import VendorProductsPage from "./presentation/pages/vendor/vendor.products.page.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/vendor/auth" element={<VendorAuthPage />} />
        <Route path="/vendor/dashboard" element={<VendorDashboardPage />} />
        <Route path="/vendor/products" element={<VendorProductsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
