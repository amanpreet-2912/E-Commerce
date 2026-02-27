import { BrowserRouter, Routes, Route } from "react-router";
import Signup from "./pages/AuthPages/Signup";
import VerifyOtp from "./pages/AuthPages/Verifyotp";
import LoginPage from "./pages/AuthPages/Login";
import UnauthorizedPage from "./pages/AuthPages/Unauthorized";
import EditProductPage from "./pages/SellerPages/EditProduct";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import AdminRoutes from "./components/auth/AdminRoutes";
import SellerRoutes from "./components/auth/SellerRoutes";
import TransporterRoutes from "./components/auth/TranporterRoutes";
import AdminProductsPage from "./pages/AdminPages/AdminProducts";
import SellerProductView from "./pages/SellerPages/SellerProductView";
import SellerDashboard from "./pages/SellerPages/SellerDashboard";
import TransporterPage from "./pages/Transporter";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import CreateProduct from "./pages/SellerPages/CreateProduct";
import AdminProductView from "./pages/AdminPages/AdminProductView";
import SellerLayout from "./pages/SellerPages/SellerLayout";
import AdminLayout from "./pages/AdminPages/AdminLayout";
import { ResetPassword } from "./pages/AuthPages/ResetPassword";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import SellerProfile from "./pages/SellerPages/SellerProfile";
import AdminProfile from "./pages/AdminPages/AdminProfile";
import AdminCategories from "./pages/AdminPages/AdminCategories";
import Demo from "./pages/demo";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<VerifyOtp />} />
        <Route index element={<LoginPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="demo" element={<Demo />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoutes />}>
            <Route element={<AdminLayout />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route
                path="/admin/product/:productId"
                element={<AdminProductView />}
              />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
            </Route>
          </Route>
          <Route element={<SellerRoutes />}>
            <Route element={<SellerLayout />}>
              <Route path="seller/dashboard" element={<SellerDashboard />} />
              <Route path="seller/newProduct" element={<CreateProduct />} />
              <Route
                path="seller/products/:productId"
                element={<SellerProductView />}
              />
              <Route path="/seller/profile" element={<SellerProfile />} />

              <Route
                path="seller/product/:productId/edit"
                element={<EditProductPage />}
              />
            </Route>
          </Route>
          <Route element={<TransporterRoutes />}>
            <Route path="transporter/dashboard" element={<TransporterPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
