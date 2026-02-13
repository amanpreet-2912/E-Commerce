import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { registerSchema } from "@/zodSchema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/useRegister";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export function SignupForm({ className, ...props }) {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      gstin: "",
      vehicleNum: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },

    control,
    watch,
  } = form;
  const role = form.watch("role");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading } = useRegister();
  const navigate = useNavigate();
  const { setEmail } = useAuthStore();
  async function onSubmit(data) {
    try {
      const res = await signup(data);
      console.log(res);

      setEmail(data.email);
      if (res?.resumeVerification) {
        toast.info("Email already registered. Otp resent.");
      } else {
        toast.success("Verify Your Email to continue");
      }
      navigate("/verify");
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center ">
          <h1 className="text-xl font-bold text-primary">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Enter Your Name"
            required
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter Your Email"
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
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
          <FieldDescription>
            Must be at least 6 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Choose your role</FieldLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="seller"
                    checked={field.value === "seller"}
                    onChange={() => field.onChange("seller")}
                  />
                  Seller
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="transporter"
                    checked={field.value === "transporter"}
                    onChange={() => field.onChange("transporter")}
                  />
                  Transporter
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="user"
                    checked={field.value === "user"}
                    onChange={() => field.onChange("user")}
                  />
                  User
                </label>
              </div>
            )}
          />

          {errors.role && (
            <p className="text-sm text-destructive">{errors.role.message}</p>
          )}
        </Field>
        {role === "seller" && (
          <Field className="mt-1">
            <FieldLabel htmlFor="gstin">GSTIN</FieldLabel>
            <Input
              {...register("gstin")}
              id="gstin"
              placeholder="Enter GSTIN"
            />
          </Field>
        )}
        {role === "transporter" && (
          <Field className="mt-1">
            <FieldLabel htmlFor="vehicleNum">Vehicle Number</FieldLabel>
            <Input
              placeholder="Enter Vehicle Number"
              {...register("vehicleNum")}
              id="vehicleNum"
            />
          </Field>
        )}
        <Field>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="text-background bg-accent hover:bg-accent-foreground"
          >
            {isSubmitting || loading ? "Creating..." : "Create Account"}
          </Button>
        </Field>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-primary hover:text-indigo-500 transition-colors"
          >
            Login
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
}
