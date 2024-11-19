import { create } from "zustand";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,

  setSocket: (socket) => {
    set({ socket });
  },

  disconnectSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.disconnect();
      }
      return { socket: null };
    });
  },
}));
