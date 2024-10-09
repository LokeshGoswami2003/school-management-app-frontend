const Home = () => {
    const userType = "Admin"; // This would typically be retrieved from the JWT or backend
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Welcome, {userType}!
                </h2>
                <p>This is your home page.</p>
            </div>
        </div>
    );
};

export default Home;
