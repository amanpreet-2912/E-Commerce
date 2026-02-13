import { useAuthStore } from "@/store/authStore";
export default function AdminProfile() {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <>
      <h1>Hello to admin Profile</h1>
    </>
  );
}
