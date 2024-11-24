import { useEffect } from "react";
import { useSocketStore } from "../store/socketStore";

function useSocketEvent(event: string, callback: (...args: any[]) => void) {
  const { socket } = useSocketStore();

  useEffect(() => {
    if (socket) {
      socket.on(event, callback);

      return () => {
        socket.off(event, callback);
      };
    }
  }, [socket, event, callback]);
}

export default useSocketEvent;
