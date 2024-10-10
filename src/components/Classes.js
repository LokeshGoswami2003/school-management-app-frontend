import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom"; // Import Link for navigation

const Classes = () => {
    const { user, setClasses } = useUser(); // Get the current user and setClasses from context
    const [loading, setLoading] = useState(true);
    const [newClass, setNewClass] = useState({
        className: "",
        year: "",
        classFees: "",
        capacity: "",
    });
    const [message, setMessage] = useState({ type: "", content: "" });
    const [classes, setClassesList] = useState([]); // Use a separate state for classes

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                let url;
                if (user.userType === "admin") {
                    url = `http://localhost:5000/api/admin/${user.userId}/classes`;
                } else if (user.userType === "teacher") {
                    url = `http://localhost:5000/api/teacher/${user.userId}/classes`;
                }

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // You can include your token here if necessary
                        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setClassesList(data.classes); // Store fetched classes in state
                setClasses(data.classes); // Update context
            } catch (err) {
                console.error("Error fetching classes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses(); // Fetch classes on component mount
    }, [user]);

    const handleCreateClass = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/classes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...newClass,
                    adminId: user.userId,
                    userType: user.userType,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create class");
            }

            const classData = await response.json();
            // Update the classes list with the newly created class
            setClassesList((prevClasses) => [...prevClasses, classData.class]);
            // Reset the form
            setNewClass({
                className: "",
                year: "",
                classFees: "",
                capacity: "",
            });
            // Set success message
            setMessage({
                type: "success",
                content: "Class created successfully",
            });
            // Clear the message after 3 seconds
            setTimeout(() => setMessage({ type: "", content: "" }), 3000);
        } catch (error) {
            console.error("Error creating class:", error);
            setMessage({ type: "error", content: "Failed to create class" });
        }
    };

    if (loading) return <p>Loading classes...</p>;

    return (
        <div className="min-h-screen p-6">
            {/* Display success or error message */}
            {message.content && (
                <div
                    className={`${
                        message.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    } p-4 mb-4 rounded`}
                >
                    {message.content}
                </div>
            )}

            {/* Create Class Form (Only for Admin) */}
            {user.userType === "admin" && (
                <form onSubmit={handleCreateClass} className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Create Class</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Class Name
                        </label>
                        <input
                            type="text"
                            value={newClass.className}
                            onChange={(e) =>
                                setNewClass({
                                    ...newClass,
                                    className: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Year
                        </label>
                        <input
                            type="number"
                            value={newClass.year}
                            onChange={(e) =>
                                setNewClass({
                                    ...newClass,
                                    year: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Class Fees
                        </label>
                        <input
                            type="number"
                            value={newClass.classFees}
                            onChange={(e) =>
                                setNewClass({
                                    ...newClass,
                                    classFees: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Capacity
                        </label>
                        <input
                            type="number"
                            value={newClass.capacity}
                            onChange={(e) =>
                                setNewClass({
                                    ...newClass,
                                    capacity: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Create Class
                    </button>
                </form>
            )}

            {/* Display Classes List */}
            <h2 className="text-2xl font-bold mb-4">Your Classes</h2>
            <ul>
                {classes.map((classItem) => (
                    <li
                        key={classItem._id}
                        className="bg-white p-4 rounded-lg shadow-lg mb-4"
                    >
                        <Link
                            to={`/classes/${classItem._id}`}
                            className="text-blue-600"
                        >
                            <h3 className="text-xl font-semibold">
                                {classItem.className}
                            </h3>
                        </Link>
                        <p>
                            <strong>Year:</strong> {classItem.year}
                        </p>
                        <p>
                            <strong>Fees:</strong> {classItem.classFees}
                        </p>
                        <p>
                            <strong>Capacity:</strong> {classItem.capacity}
                        </p>
                        <p>
                            <strong>Teachers:</strong>{" "}
                            {classItem.teachersList
                                .map((teacher) => teacher.username)
                                .join(", ")}
                        </p>
                        <p>
                            <strong>Students:</strong>{" "}
                            {classItem.studentList.length}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Classes;
