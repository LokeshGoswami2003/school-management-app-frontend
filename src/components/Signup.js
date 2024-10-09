import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup"; // Popup component to show success/error messages

const Signup = () => {
    const [role, setRole] = useState("admin"); // Default to admin
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [password, setPassword] = useState("");
    const [salary, setSalary] = useState(""); // Only for teacher
    const [message, setMessage] = useState(""); // To show success/error messages
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'
    const navigate = useNavigate(); // For navigation

    const handleSignup = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            password,
            userType: role,
            schoolName,
        };
        if (role === "teacher") userData.salary = salary;

        try {
            // Signup the user
            const signupRes = await axios.post(
                "http://localhost:5000/api/auth/signup",
                userData
            );

            // Show success popup
            setMessage("User created successfully!");
            setMessageType("success");

            // Automatically log in after signup
            const loginRes = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                    userType: role,
                }
            );

            // Store the access token
            localStorage.setItem("token", loginRes.data.accessToken);

            // Redirect to home after login
            setTimeout(() => {
                navigate("/home"); // Redirect to home page after a delay
            }, 2000); // Show popup for 2 seconds
        } catch (err) {
            setMessage(
                "Error: " + err.response?.data?.message || "Signup failed"
            );
            setMessageType("error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
                {message && <Popup message={message} type={messageType} />}{" "}
                {/* Popup Component */}
                <form onSubmit={handleSignup}>
                    {/* Role Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Account Type
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
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

                    {/* School Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            School Name
                        </label>
                        <input
                            type="text"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    {/* Salary (only for teachers) */}
                    {role === "teacher" && (
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Salary
                            </label>
                            <input
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            />
                        </div>
                    )}

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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
