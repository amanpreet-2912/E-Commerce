import { LoginForm } from "@/components/blocks/login-form";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      <div className="relative hidden lg:block">
        <img
          // src="https://static.vecteezy.com/system/resources/previews/007/814/278/non_2x/discounts-sale-illustration-online-store-in-the-mobile-application-of-the-smartphone-tiny-people-choose-goods-at-low-prices-in-their-gadgets-free-vector.jpg"
          // src="https://img.freepik.com/premium-photo/close-up-blue-yellow-shop-with-balloons_1034058-112224.jpg?ga=GA1.1.172251223.1762928360&semt=ais_hybrid&w=740&q=80"
          // src="https://img.freepik.com/premium-photo/5-shopping-app-customer-reviews-ratings-flat-design-illustration_486608-1140.jpg?ga=GA1.1.172251223.1762928360&semt=ais_hybrid&w=740&q=80"
          // src="https://img.freepik.com/premium-photo/product-review-section-web-store-showcasing-customer-feedback-ratings_995578-20445.jpg?ga=GA1."
          // src="https://img.freepik.com/free-vector/flat-design-rebranding-illustration_23-2149483646.jpg?t=st=1772191944~exp=1772195544~hmac=a2785c940104f55931a7db9660ce7d8d522b00b296a2cdf96cecc1d8a5c5a06e&w=740"
          src="https://img.freepik.com/premium-vector/people-using-smartphone-mobile-shopping_53562-6846.jpg?ga=GA1.1.172251223.1762928360&semt=ais_hybrid&w=740&q=80"
          alt="Shopping"
          className="absolute inset-0 h-full w-full object-cover"
        />

       
      </div>

      <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
                    

          <LoginForm />
        </div>
      </div>
    </div>
  );
}