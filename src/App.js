import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { UserProvider } from "./contexts/UserContext";

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
            { path: "home", element: <Home /> },
            {
                path: "*", // Catch all routes and redirect to login
                element: <Navigate to="/login" replace />,
            },
            {
                path: "/", // Default route
                element: <Navigate to="/login" replace />, // Always redirect to login
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
