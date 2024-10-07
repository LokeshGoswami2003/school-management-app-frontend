import React, { useState } from "react";

const Signup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // for signup

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Add signup logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isLogin ? "Login" : "Sign Up"}
                        </button>
                        <a
                            href="#"
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    {isLogin ? (
                        <p>
                            Don't have an account?{" "}
                            <button
                                className="text-blue-500 hover:text-blue-800 font-bold"
                                onClick={() => setIsLogin(false)}
                            >
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                className="text-blue-500 hover:text-blue-800 font-bold"
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
