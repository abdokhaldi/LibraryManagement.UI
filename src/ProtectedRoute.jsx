import { Outlet, Navigate } from "react-router-dom"; 

export function ProtectedRoute({isAuthenticated}){
return isAuthenticated ? <Outlet/> : <Navigate to={"/welcome"} replace/>
}