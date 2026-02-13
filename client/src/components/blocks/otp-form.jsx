import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useForm, Controller } from "react-hook-form";
import { otpSchema } from "@/zodSchema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/authStore";
import { useRegister } from "@/hooks/useRegister";
import { toast } from "sonner";

export function OTPForm({ className, ...props }) {
  const { verify, loading } = useRegister();
  const { signupEmail, clearEmail } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: signupEmail,
      otp: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = form;
  async function onSubmit(data) {
    try {
      await verify(data);
      toast.success("Account created Successfully.",{
        description:"You can log in into your account now."
      })
      clearEmail();
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Enter verification code</h1>
            <p className="text-muted-foreground text-sm text-balance">
              We sent a 6-digit code to your email.
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="otp" className="sr-only">
              Verification code
            </FieldLabel>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP
                  value={field.value ?? ""}
                  onChange={(value) => field.onChange(value)}
                  maxLength={6}
                >
                  <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />

            {errors.otp && (
              <p className="text-sm text-red-500">{errors.otp.message}</p>
            )}
            <FieldDescription className="text-center">
              Enter the 6-digit code sent to your email.
            </FieldDescription>
          </Field>
          <Button className={"text-background"} type="submit" disabled={isSubmitting}>
            {isSubmitting || loading ? "Verifying" : "Verify"}
          </Button>
          {/* <FieldDescription className="text-center">
            Didn&apos;t receive the code? <a href="#">Resend</a>
          </FieldDescription> */}
        </FieldGroup>
      </form>
    </div>
  );
}
