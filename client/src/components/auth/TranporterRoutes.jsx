import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

export default function TransporterRoutes() {
  const user = useAuthStore((s) => s.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "transporter") {
    return <Navigate to="/unauthorized" replace />;
  }
  if (user.approvalStatus !== "approved") {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
}
