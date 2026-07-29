// src/providers/SocketProvider.jsx

import {
    createContext,
    useContext,
    useEffect,
} from "react";
import socket from "../services/socket";

const SocketContext = createContext(socket);

export function SocketProvider({
    children,
}) {
    useEffect(() => {
        const token =
            localStorage.getItem("token");
        if (!token) return;

        socket.auth = {
            token,
        };

        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    return useContext(SocketContext);
}
