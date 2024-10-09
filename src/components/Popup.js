const Popup = ({ message, type }) => {
    const bgColor =
        type === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";

    return <div className={`${bgColor} p-4 rounded-lg mb-4`}>{message}</div>;
};

export default Popup;
