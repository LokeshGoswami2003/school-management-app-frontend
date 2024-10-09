import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
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
                path: "/", // Default route if the user is not authenticated
                element: <Navigate to="/login" />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
