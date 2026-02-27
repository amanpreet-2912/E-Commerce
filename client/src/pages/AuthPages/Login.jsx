import { LoginForm } from "@/components/blocks/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="https://static.vecteezy.com/system/resources/previews/007/814/278/non_2x/discounts-sale-illustration-online-store-in-the-mobile-application-of-the-smartphone-tiny-people-choose-goods-at-low-prices-in-their-gadgets-free-vector.jpg"
          alt="Image"
          className="h-[90%] w-auto object-contain scale-[1.2] mr-3"
        />
      </div>
    </div>
  );
}
