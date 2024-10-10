import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import Popup from "./Popup"; // Assuming you already have a Popup component

const Profile = () => {
    const { user, setUser } = useUser(); // Get the user data from context
    const [popup, setPopup] = useState({ message: "", type: "" });

    // Editable fields, initialized with user's data or empty strings if not available
    const [username, setUsername] = useState(user.username || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [dob, setDob] = useState(user.dob || "");
    const [gender, setGender] = useState(user.gender || "");
    const schoolName = user.schoolName;
    const [salary, setSalary] = useState(user.salary || "");
    const fees = user.fees;
    const userId = user._id;

    const handleClosePopup = () => {
        setPopup({ message: "", type: "" });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const updatedData = {
            userId,
            username,
            email,
            phone,
            dob,
            gender,
            schoolName,
            salary: user.userType === "teacher" ? salary : undefined,
            fees: user.userType === "student" ? fees : undefined,
        };

        try {
            const response = await axios.put(
                "http://localhost:5000/api/auth/updateProfile", // Update this to your correct API endpoint
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`, // Assuming token-based auth
                    },
                }
            );

            if (response.status === 200) {
                // Update the user in context after successful update
                setUser((prevUser) => ({
                    ...prevUser,
                    ...updatedData,
                }));

                setPopup({
                    message: "Profile updated successfully!",
                    type: "success",
                });
            }
        } catch (error) {
            setPopup({
                message:
                    error.response?.data?.message || "Profile update failed",
                type: "error",
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Edit Profile
                </h2>

                {popup.message && (
                    <Popup
                        message={popup.message}
                        type={popup.type}
                        onClose={handleClosePopup}
                    />
                )}

                {/* Profile Form */}
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-100"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-100"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Mobile No
                        </label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-100"
                            placeholder="Enter your mobile number"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-100"
                            placeholder="Enter your date of birth"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Gender
                        </label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-100"
                        >
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* School Name */}

                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            School
                        </label>
                        <p className="w-full px-4 py-2 border rounded-lg bg-gray-100">
                            {schoolName ? schoolName : "No School"}{" "}
                            {/* Display fees value or a default message */}
                        </p>
                    </div>

                    {/* Salary for Teacher */}
                    {user.userType === "teacher" && (
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                Salary
                            </label>
                            <input
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-gray-100"
                                placeholder="Enter your salary"
                            />
                        </div>
                    )}

                    {/* Fees for Student */}
                    {user.userType === "student" && (
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">
                                Fees
                            </label>
                            <p className="w-full px-4 py-2 border rounded-lg bg-gray-100">
                                {fees ? fees : "Fees not available"}{" "}
                                {/* Display fees value or a default message */}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
