import { OTPForm } from "@/components/blocks/otp-form"

export default function VerifyOtp() {
  return (
    <div className="flex min-h-svh w-full">
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-xs">
          <OTPForm />
        </div>
      </div>
      <div className="relative hidden w-1/2 lg:block">
        <img
          alt="Authentication"
          className="absolute inset-0 h-full w-full object-cover"
          height={1080}
          src="https://img.freepik.com/free-vector/flat-illustration-safer-internet-day_23-2151127494.jpg?t=st=1770896939~exp=1770900539~hmac=f5c410110c6d1babf0d875c615274341d38920ebf9b408581fe740166a420f48&w=1480"
          width={1920}
        />
      </div>
    </div>
  )
}
// https://i.ibb.co/S76MVxKY/10198948.jpg
