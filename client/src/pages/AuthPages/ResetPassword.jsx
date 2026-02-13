import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "@/hooks/useRegister";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { resetSchema } from "@/zodSchema/register";

export function ResetPassword({ className, ...props }) {
  const navigate = useNavigate();
  const { reset, loading } = useRegister();
  const { signupEmail } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    register,
  } = form;

  async function onSubmit(data) {
    try {
      console.log(data);
      await reset({
        email: signupEmail,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      toast.success("Password reset successfully");
      navigate("/");
    } catch (err) {
      toast.error("Something Went Wrong");
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="text-sm text-muted-foreground">
            Enter the OTP and your new password
          </p>
        </div>

        <Field>
          <FieldLabel className="sr-only">OTP</FieldLabel>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                value={field.value}
                onChange={field.onChange}
                maxLength={6}
              >
                <InputOTPGroup>
                  {[0, 1].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {[2, 3].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {[4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {errors.otp && (
            <p className="text-sm text-destructive">{errors.otp.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>New Password</FieldLabel>
          <Input
            type="password"
            {...register("newPassword")}
            placeholder="Enter New Password"
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </Field>

        <Button
          type="submit"
          disabled={isSubmitting || loading}
          className="text-background"
        >
          {isSubmitting || loading ? "Resetting..." : "Reset Password"}
        </Button>
      </FieldGroup>
    </form>
  );
}
