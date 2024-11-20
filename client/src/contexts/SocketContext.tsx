import { createContext, useEffect, ReactNode } from "react";
import io, { Socket } from "socket.io-client";
import { useSocketStore } from "../store/socketStore";

interface SocketContextProps {
  socket: Socket | null;
  connectSocket: (serverUrl: string) => void;
  disconnectSocket: () => void;
}

export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined
);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, setSocket, disconnectSocket } = useSocketStore();

  const connectSocket = (serverUrl: string) => {
    if (socket) return; // Prevent multiple connections
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });
  };

  useEffect(() => {
    return () => {
      disconnectSocket(); // Clean up socket connection on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
