import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Classes from "./components/Classes";
import ClassDetail from "./components/ClassDetail"; // Import ClassDetail
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

const RootLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "signup", element: <Signup /> },
            { path: "login", element: <Login /> },
            {
                path: "home",
                element: <ProtectedRoute />, // Protected route for home
                children: [{ path: "", element: <Home /> }],
            },
            {
                path: "classes", // Route for classes
                element: <ProtectedRoute />,
                children: [{ path: "", element: <Classes /> }],
            },
            {
                path: "classes/:classId", // Route for class details
                element: <ClassDetail />,
            },
            {
                path: "/", // Default route if the user is not authenticated
                element: <Navigate to="/login" />,
            },
        ],
    },
]);

function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

export default App;
