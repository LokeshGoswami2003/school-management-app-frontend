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
import { UserProvider, useUser } from "./contexts/UserContext"; // Import UserProvider and useUser

const RootLayout = () => {
    return (
        <div>
            <Outlet /> {/* Used for nested routes */}
        </div>
    );
};

// Protected route component to ensure only authenticated users can access certain routes
const ProtectedRoute = ({ children }) => {
    const { user } = useUser(); // Access user data from context

    if (!user) {
        return <Navigate to="/login" replace />; // Redirect to login if no user
    }

    return children;
};

// Define your routes using React Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "signup", element: <Signup /> },
            { path: "login", element: <Login /> },
            {
                path: "home",
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ), // Protect the home route
            },
            {
                path: "/", // Default route, redirects to login
                element: <Navigate to="/login" replace />,
            },
        ],
    },
]);

function App() {
    return (
        <UserProvider>
            {" "}
            {/* Wrap your app in UserProvider to provide user context */}
            <RouterProvider router={router} /> {/* Set up router */}
        </UserProvider>
    );
}

export default App;
