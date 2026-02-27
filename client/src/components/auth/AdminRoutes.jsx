import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

export default function AdminRoutes(){
const user=useAuthStore((s)=>s.user);
if(!user){
 return <Navigate to="/" replace />;

}
if(user.role!=="admin"){
    return <Navigate to="/unauthorized" replace />;
    
}
return <Outlet/>

}