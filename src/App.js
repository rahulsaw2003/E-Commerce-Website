import { Routes, Route } from "react-router-dom";

import "./App.css";
import {
  HomePage,
  ProductsPage,
  ProductDetailsPage,
  WishlistPage,
  CartPage,
  CheckoutPage,
} from "pages";
import {
  Error,
  Footer,
  LoginForm,
  Navbar,
  PrivateRoute,
  SignupForm,
  UserProfile,
} from "components";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "utils";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: "1.2rem",
            fontWeight: "bold",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/productDetails/:productId"
          element={<ProductDetailsPage />}
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Guest users can access cart, wishlist, and checkout */}
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Protected routes - require authentication */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
