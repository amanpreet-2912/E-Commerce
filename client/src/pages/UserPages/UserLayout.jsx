import { Outlet, useNavigate } from "react-router";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRegister } from "@/hooks/useRegister";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/assets/logo.png";
export default function UserLayout() {
  const navigate = useNavigate();
  const { clearUser } = useAuthStore();
  const { logout } = useRegister();
  async function handleLogout() {
    await logout();
    clearUser();
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/40">
      <header className="bg-card border-b shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center">
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="Logo" className="h-8" />
            <h1 className="text-2xl font-bold text-primary">MernMart</h1>
          </div>

          <div className="flex items-center gap-6">
            <ShoppingCart
              size={20}
              className="cursor-pointer hover:text-accent transition"
              onClick={() => navigate("/user/cart")}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User
                  size={20}
                  className="cursor-pointer hover:text-accent transition"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {/* <DropdownMenuLabel className={"text-primary"}>My Account</DropdownMenuLabel> */}
                  <DropdownMenuItem onClick={() => navigate("/user/profile")}>
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/user/orders")}>
                    View Orders
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {/* <DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuGroup> */}
              </DropdownMenuContent>
            </DropdownMenu>
            <LogOut
              size={20}
              className="cursor-pointer hover:text-destructive transition"
              onClick={handleLogout}
            />
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
