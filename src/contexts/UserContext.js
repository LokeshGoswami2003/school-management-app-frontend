import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Restore user from localStorage on app load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set the user
        }
    }, []);

    // Whenever user changes, store it in localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage
        } else {
            localStorage.removeItem("user"); // If no user, remove from localStorage
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
