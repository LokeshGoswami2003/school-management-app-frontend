import { useState, useEffect } from "react";
import Profile from "./Profile"; // Import Profile component
import Classes from "./Classes"; // Import other components as needed
import { useUser } from "../contexts/UserContext";

const Home = () => {
    const { user } = useUser();
    const [selectedMenu, setSelectedMenu] = useState("profile"); // Default to Profile

    // Conditional rendering logic for the main content area
    const renderContent = () => {
        switch (selectedMenu) {
            case "profile":
                return <Profile />; // Render Profile component
            case "classes":
                return <Classes />; // Render Classes component (or other component)
            default:
                return <Profile />; // Default to Profile if no valid option is selected
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6">
                <h1 className="text-2xl font-bold mb-4">Menu</h1>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold">{user?.username}</h2>
                    <p className="text-gray-400">{user?.userType}</p>
                </div>

                {/* Sidebar Menu */}
                <ul>
                    <li
                        className={`cursor-pointer py-2 px-4 rounded hover:bg-gray-700 ${
                            selectedMenu === "profile" ? "bg-gray-700" : ""
                        }`}
                        onClick={() => setSelectedMenu("profile")}
                    >
                        Profile
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-4 rounded hover:bg-gray-700 ${
                            selectedMenu === "classes" ? "bg-gray-700" : ""
                        }`}
                        onClick={() => setSelectedMenu("classes")}
                    >
                        Classes
                    </li>
                    {/* Add more menu items as needed */}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                {renderContent()}{" "}
                {/* Display the content based on selected menu */}
            </div>
        </div>
    );
};

export default Home;
