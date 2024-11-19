import { createContext, useEffect, ReactNode } from "react";
import io, { Socket } from "socket.io-client";
import { useSocketStore } from "../store/socketStore";

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
  serverUrl: string;
}

export const SocketProvider = ({
  children,
  serverUrl,
}: SocketProviderProps) => {
  const { setSocket, disconnectSocket } = useSocketStore();

  useEffect(() => {
    const socket: Socket = io(serverUrl);
    setSocket(socket);

    return () => {
      disconnectSocket();
    };
  }, [serverUrl, setSocket, disconnectSocket]);

  return (
    <SocketContext.Provider value={{ socket: useSocketStore().socket }}>
      {children}
    </SocketContext.Provider>
  );
};
