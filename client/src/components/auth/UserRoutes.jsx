import { useAuthStore } from "@/store/authStore"
import { Navigate, Outlet } from "react-router"
export default function UserRoutes(){
    const user=useAuthStore((s)=>s.user)
    if(!user){
        return <Navigate to="/" replace/>; 
    }
    if(user.role!=="user"){
        return <Navigate to="/unauthorized" replace />; 
    }
    return <Outlet/>
}