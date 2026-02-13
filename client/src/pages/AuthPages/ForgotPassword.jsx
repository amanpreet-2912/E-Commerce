import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/zodSchema/register";
import { toast } from "sonner";
import { useRegister } from "@/hooks/useRegister";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  const { setEmail } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const { loading, forgot } = useRegister();
  async function onSubmit(data) {
    try {
      console.log(data);
      await forgot(data);
      toast.success("OTP sent to your email");
      setEmail(data.email);
      navigate("/reset-password");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6")}
      
    >
      <FieldGroup>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to receive a reset code
          </p>
        </div>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input {...register("email")} placeholder="Enter Email" />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </Field>

        <Button
          type="submit"
          disabled={isSubmitting || loading}
          className="text-background"
        >
          {isSubmitting || loading ? "Sending..." : "Send OTP"}
        </Button>

        <FieldDescription className="text-center">
          Remembered your password?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
