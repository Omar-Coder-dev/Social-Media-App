import { Navigate } from "react-router";

export function ProtectedRouting(props){
    if (localStorage.getItem("token")) {
        return props.children;
    }
    else {
        return <Navigate to="/login" />
    }
}