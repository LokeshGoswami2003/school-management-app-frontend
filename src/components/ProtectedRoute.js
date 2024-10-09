import { Navigate, Outlet } from "react-router-dom";

// Protected route component to check if the user is authenticated
const ProtectedRoute = () => {
    const isLoggedIn = !!localStorage.getItem("token"); // Check if the token exists

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />; // If logged in, render child routes; otherwise, redirect to login
};

export default ProtectedRoute;
