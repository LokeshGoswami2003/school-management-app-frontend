import { useEffect } from "react";

const Popup = ({ message, type, onClose }) => {
    const bgColor =
        type === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";

    // Automatically close the popup after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Call the onClose function to clear the message
        }, 2000); // Adjust duration as needed

        return () => clearTimeout(timer); // Clear the timeout on component unmount
    }, [onClose]);

    return (
        <div
            className={`${bgColor} p-4 rounded-lg mb-4 z-50 fixed top-16 right-4 shadow-lg`}
        >
            {message}
        </div>
    );
};

export default Popup;
