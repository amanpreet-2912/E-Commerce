import { useAuthStore } from "@/store/authStore";

export default function SellerProfile() {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <>
      <h1>Hello to seller Profile</h1>
    </>
  );
}
