import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";


export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-md text-center space-y-4 p-6 border rounded-lg">
        <h1 className="text-2xl font-semibold text-primary">
          Account Pending Approval
        </h1>
        <p className="text-muted-foreground">
          Your account has been created successfully. An admin needs to approve
          your request before you can continue.
        </p>
        <Button
          className="text-background bg-accent hover:bg-accent-foreground"
          onClick={() => navigate("/")}
        >
          Back To Login
        </Button>
      </div>
    </div>
  );
} 
