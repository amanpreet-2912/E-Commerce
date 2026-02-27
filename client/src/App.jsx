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
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import CreateProduct from "./pages/SellerPages/CreateProduct";
import AdminProductView from "./pages/AdminPages/AdminProductView";
import SellerLayout from "./pages/SellerPages/SellerLayout";
import AdminLayout from "./pages/AdminPages/AdminLayout";
import { ResetPassword } from "./pages/AuthPages/ResetPassword";
import ForgotPassword from "./pages/AuthPages/ForgotPassword";
import AdminCategories from "./pages/AdminPages/AdminCategories";
import UserLayout from "./pages/UserPages/UserLayout";
import Demo from "./pages/demo";
import ProfilePage from "./pages/ProfilePage";
import UserRoutes from "./components/auth/UserRoutes";
import { AdminRequestsPage } from "./pages/AdminPages/AdminRequestsPage";
import UserHomePage from "./pages/UserPages/UserHomePage";
import CategoryProductsPage from "./pages/UserPages/CategoryProductsPage";
import AdminUserTable from "./pages/AdminPages/AdminUserTable";
import UserSingleProduct from "./pages/UserPages/UserSingleProduct";
import UserCart from "./pages/UserPages/CartPage";
import AlertPage from "./pages/Alert";
import OrdersPage from "./pages/UserPages/OrdersPage";
import SellerProductsPage from "./pages/SellerPages/SellerProducts";
import SellerOrders from "./pages/SellerPages/SellerOrdersPage";
import AdminOrders from "./pages/AdminPages/AdminOrdersPage";
import TransporterPage from "./pages/TransporterPages/TransporterMainPage";
import Dropdown from "./pages/Dropdown";
import Checkout from "./pages/UserPages/CheckoutPage";

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
        <Route path="alert" element={<AlertPage />} />
        <Route path="demo" element={<Dropdown />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminRoutes />}>
            <Route element={<AdminLayout />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/requests" element={<AdminRequestsPage />} />
              <Route path="/admin/orders" element={<AdminOrders />} />

              <Route
                path="/admin/product/:productId"
                element={<AdminProductView />}
              />
              <Route path="/admin/profile" element={<ProfilePage />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/users/:type" element={<AdminUserTable />} />
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
              <Route path="/seller/profile" element={<ProfilePage />} />
              <Route path="/seller/products" element={<SellerProductsPage />} />
              <Route path="/seller/orders" element={<SellerOrders />} />

              <Route
                path="seller/product/:productId/edit"
                element={<EditProductPage />}
              />
            </Route>
          </Route>
          <Route element={<TransporterRoutes />}>
            <Route path="/transporter" element={<TransporterPage />} />
            <Route path="/transporter/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<UserRoutes />}>
            <Route element={<UserLayout />}>
              <Route path="user/products" element={<UserHomePage />} />
              <Route path="user/profile" element={<ProfilePage />} />
              <Route
                path="user/categories/:categoryId"
                element={<CategoryProductsPage />}
              />
              <Route
                path="user/product/:productId"
                element={<UserSingleProduct />}
              />
              <Route path="user/cart" element={<UserCart />} />
              <Route path="user/orders" element={<OrdersPage />} />
              <Route path="user/checkout/:productId" element={<Checkout />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
