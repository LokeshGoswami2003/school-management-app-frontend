import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2"; // Only import the Pie component
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import necessary components from Chart.js
import { useUser } from "../contexts/UserContext";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ClassDetail = () => {
    const { classId } = useParams(); // Get the classId from the URL
    const { user } = useUser(); // Get the current user from context
    const [classDetail, setClassDetail] = useState(null); // State to store class details
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: "", content: "" });

    useEffect(() => {
        const fetchClassDetail = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/classes/${classId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`, // Include token if needed
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                setClassDetail(data.class); // Set class details
            } catch (err) {
                console.error("Error fetching class details:", err);
                setMessage({
                    type: "error",
                    content: "Failed to load class details",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchClassDetail(); // Call the function to fetch class details
    }, [classId]);

    if (loading) return <p>Loading class details...</p>;

    // Data for the pie chart
    const chartData = {
        labels: ["Male Students", "Female Students"],
        datasets: [
            {
                data: [classDetail.maleCount, classDetail.femaleCount],
                backgroundColor: ["#36A2EB", "#FF6384"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">{classDetail.className}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                <p>
                    <strong>Year:</strong> {classDetail.year}
                </p>
                <p>
                    <strong>Fees:</strong> ${classDetail.classFees}
                </p>
                <p>
                    <strong>Capacity:</strong> {classDetail.capacity}
                </p>
                <p>
                    <strong>Total Students:</strong> {classDetail.totalStudents}
                </p>
                <p>
                    <strong>Male Students:</strong> {classDetail.maleCount}
                </p>
                <p>
                    <strong>Female Students:</strong> {classDetail.femaleCount}
                </p>

                <h3 className="text-xl font-semibold mt-4">Teachers:</h3>
                <ul>
                    {classDetail.teachersList.map((teacher) => (
                        <li key={teacher._id}>{teacher.username}</li>
                    ))}
                </ul>

                <h3 className="text-xl font-semibold mt-4">Students:</h3>
                <ul>
                    {classDetail.studentList.map((student) => (
                        <li key={student._id}>{student.username}</li>
                    ))}
                </ul>
            </div>

            {/* Pie chart for male and female student counts */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                    Student Gender Distribution
                </h3>
                <Pie data={chartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default ClassDetail;
