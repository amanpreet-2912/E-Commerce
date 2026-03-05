import { SignupForm } from "@/components/blocks/signup-form";
export default function Signup() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-linear-to-br from-indigo-50 via-white to-indigo-100">
      
      <div className="flex items-center justify-center p-6 md:p-10">
        
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md border shadow-xl rounded-2xl p-8">
          <SignupForm />
        </div>
      </div>

    
      <div className="relative hidden lg:block h-screen overflow-hidden">
        <img
          src="https://img.freepik.com/free-vector/online-shopping-banner-mobile-app-templates-concept-flat-design_1150-34863.jpg?w=1480"
          alt="Signup Illustration"
          className="absolute inset-0 h-full w-full object-cover"
        />

        
      </div>
    </div>
  );
}