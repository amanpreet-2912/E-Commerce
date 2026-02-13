export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-md text-center space-y-4 p-6 border rounded-lg">
        <h1 className="text-2xl font-semibold text-amber-600">
          Account Pending Approval
        </h1>
        <p className="text-muted-foreground">
          Your account has been created successfully.
          An admin needs to approve your request before you can continue.
        </p>
      </div>
    </div>
  );
}
