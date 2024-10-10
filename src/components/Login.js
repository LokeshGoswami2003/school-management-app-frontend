import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { useUser } from "../contexts/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const { setUser } = useUser();
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("admin"); // Default to admin
    const [popup, setPopup] = useState({ message: "", type: "" });
    const navigate = useNavigate(); // For redirection

    const handleClosePopup = () => {
        setPopup({ message: "", type: "" });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginRes = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                    userType,
                }
            );

            if (loginRes.status === 200) {
                // Store token in localStorage
                localStorage.setItem(
                    "token",
                    loginRes?.data?.result?.accessToken
                );

                // Set user in context and localStorage
                const userData = loginRes.data.result.user;
                setUser(userData); // Set user in context
                localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage

                // Show success popup and redirect
                setPopup({
                    message: "Login successful! Redirecting to home...",
                    type: "success",
                });

                setTimeout(() => {
                    navigate("/home"); // Redirect to home
                }, 2000);
            }
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message ||
                "Login failed! Please try again.";
            setPopup({
                message: `Error: ${errorMessage}`,
                type: "error",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                {popup.message && (
                    <Popup
                        message={popup.message}
                        type={popup.type}
                        onClose={handleClosePopup}
                    />
                )}

                <form onSubmit={handleLogin}>
                    {/* Account Type */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Account Type
                        </label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
