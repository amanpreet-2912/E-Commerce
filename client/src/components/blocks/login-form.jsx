import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/zodSchema/register";
import { useRegister } from "@/hooks/useRegister";
import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const { login, loading } = useRegister();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const { setUser } = useAuthStore();
  async function onSubmit(data) {
    try {
      const res = await login(data);

      if (res.resumeVerification) {
        toast.info("Please verify your email first", {
          description: "OTP sent to your email",
        });
        return navigate("/verify", { replace: true });
      }

      const user = res.user;

      setUser(user);

      toast.success("Logged in Successfully"  );

      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
        return;
      }
     
      if (
        (user.role === "seller" || user.role === "transporter") &&
        user.approvalStatus !== "approved"
      ) {
        navigate("/unauthorized", { replace: true });
      }
      switch (user.role) {
        case "seller":
          navigate("/seller/dashboard", { replace: true });
          break;
        case "transporter":
          navigate("/transporter", { replace: true });
          break;
        case "user":
          navigate("/user/products", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    }
  }
  return (
  <form
  onSubmit={handleSubmit(onSubmit)}
  className={cn("flex flex-col gap-6", className)}
  {...props}
>
  <div className="flex flex-col items-center gap-2 text-center">
    <h1 className="text-3xl font-bold text-primary">
      Welcome Back
    </h1>
    <p className="text-muted-foreground text-sm">
      Enter your credentials to access your account
    </p>
  </div>

  <div className="space-y-2">
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input
      {...register("email")}
      id="email"
      type="email"
      placeholder="Enter your email"
      className="rounded-xl focus-visible:ring-2 focus-visible:ring-amber-200 transition-all"
    />
    {errors.email && (
      <p className="text-sm text-destructive">
        {errors.email.message}
      </p>
    )}
  </div>


  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Link
        to="/forgot-password"
        className="text-sm text-primary hover:underline"
      >
        Forgot password?
      </Link>
    </div>

    <div className="relative">
      <Input
        {...register("password")}
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        className="rounded-xl pr-10 focus-visible:ring-2 focus-visible:ring-amber-200  transition-all"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>

    {errors.password && (
      <p className="text-sm text-destructive">
        {errors.password.message}
      </p>
    )}
  </div>

  
  <Button
    type="submit"
    disabled={isSubmitting}
    className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 transition-all duration-200 shadow-md hover:shadow-lg"
  >
    {isSubmitting || loading ? "Logging in..." : "Login"}
  </Button>

  <div className="text-center text-sm text-muted-foreground">
    Don’t have an account?{" "}
    <Link
      to="/signup"
      className="text-indigo-600 font-medium hover:underline"
    >
      Create Account
    </Link>
  </div>
</form>
  );
}
