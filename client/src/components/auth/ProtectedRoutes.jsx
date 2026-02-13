import { Outlet, Navigate } from "react-router";
import { useAuthStore } from "@/store/authStore";
export default function ProtectedRoute() {
  const authenticated = useAuthStore((s) => s.isAuthenticated);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
