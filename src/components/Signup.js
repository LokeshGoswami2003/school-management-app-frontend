import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import { useUser } from "../contexts/UserContext";

const Signup = () => {
    const [role, setRole] = useState("admin");
    const { setUser } = useUser();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [password, setPassword] = useState("");
    const [salary, setSalary] = useState("");
    const [gender, setGender] = useState("male");
    const [popup, setPopup] = useState({ message: "", type: "" });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        console.log("Selected Gender:", gender);
        // Frontend validation
        if (
            !username ||
            !email ||
            !password ||
            !schoolName ||
            !gender ||
            !dob
        ) {
            setPopup({
                message: "Please fill in all required fields.",
                type: "error",
            });
            return;
        }

        if (role === "teacher" && !salary) {
            setPopup({
                message: "Please enter the salary for the teacher role.",
                type: "error",
            });
            return;
        }

        const userData = {
            username,
            email,
            password,
            userType: role,
            schoolName,
            gender,
            dob,
        };

        if (role === "teacher") {
            userData.salary = salary;
        }

        try {
            // Signup the user
            console.log("Signing up:", userData); // Log the signup data
            const signupRes = await axios.post(
                "http://localhost:5000/api/auth/signup",
                userData
            );

            // Check if signup was successful
            console.log("Signup response:", signupRes.data.statusCode);
            console.log(gender); // Log signup response
            if (signupRes.data.statusCode === 201) {
                setPopup({
                    message: signupRes.data.message,
                    type: signupRes.data.status,
                });

                // Automatically log in after signup
                console.log("Logging in..."); // Log before login
                const loginRes = await axios.post(
                    "http://localhost:5000/api/auth/login",
                    {
                        email,
                        password,
                        userType: role,
                    }
                );

                // Check if login was successful
                console.log("Login response:", loginRes); // Log login response
                if (loginRes.status === 200) {
                    console.log(
                        "accessToken is" +
                            " " +
                            loginRes.data.result.accessToken
                    );
                    localStorage.setItem(
                        "token",
                        loginRes.data.result.accessToken
                    );
                    setUser(loginRes.data.result.user);

                    setTimeout(() => {
                        navigate("/home"); // Redirect to home page after a delay
                    }, 2000); // Show popup for 2 seconds
                }
            } else {
                console.log("116e");

                setPopup({
                    message: signupRes.data.message,
                    type: signupRes.data.status,
                });
            }
        } catch (err) {
            // Show error popup
            const errorMessage = err.response?.data?.message || "Signup failed";
            setPopup({ message: `Error: ${errorMessage}`, type: "error" });
            console.error("Error during signup/login:", err); // Log the error
        }
    };

    const handleClosePopup = () => {
        setPopup({ message: "", type: "" }); // Reset popup state
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

                {/* Display Popup */}
                {popup.message && (
                    <Popup
                        message={popup.message}
                        type={popup.type}
                        onClose={handleClosePopup}
                    />
                )}

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

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Gender
                        </label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
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
