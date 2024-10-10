import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null; // Load user from local storage
    });
    const [classes, setClasses] = useState([]); // State to store classes

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user)); // Save user to local storage whenever it changes
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, classes, setClasses }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
