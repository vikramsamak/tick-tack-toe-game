import { create } from "zustand";

interface GameState {
  playerName: string;
  setPlayerName: (name: string) => void;
  gameStatus: "waiting" | "playing" | "finished";
  setGameStatus: (status: "waiting" | "playing" | "finished") => void;
  playerScore: number;
  setPlayerScore: (score: number) => void;
  playerMoves: number[];
  setPlayerMoves: (moves: number[]) => void;
}

const getStoredState = (): GameState => {
  const storedState = localStorage.getItem("gameState");

  return storedState
    ? JSON.parse(storedState)
    : {
        playerName: "",
        gameStatus: "waiting",
        playerScore: 0,
        playerMoves: [],
      };
};

export const useGameStore = create<GameState>((set) => ({
  ...getStoredState(),
  setPlayerName: (name) => {
    set((state) => {
      const newState = { ...state, playerName: name };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },
  gameStatus: "waiting",
  setGameStatus: (status) => {
    set((state) => {
      const newState = { ...state, gameStatus: status };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },
  setPlayerScore: (score) => {
    set((state) => {
      const newState = { ...state, playerScore: score };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },
  playerMoves: [],
  setPlayerMoves: (moves) => {
    set((state) => {
      const newState = { ...state, playerMoves: moves };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },
}));
