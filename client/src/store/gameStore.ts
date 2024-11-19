import { create } from "zustand";

interface GameState {
  playerName: string;
  setPlayerName: (name: string) => void;
  gameRoomId: string;
  setGameRoomId: (roomId: string) => void;
  gameStatus: "waiting" | "playing" | "finished";
  setGameStatus: (status: "waiting" | "playing" | "finished") => void;
  setPlayerScore: (score: number) => void;
  playerMoves: number[];
  setPlayerMoves: (moves: number[]) => void;
  opponentMoves: number[];
  setOpponentMoves: (moves: number[]) => void;
  currentPlayer: "X" | "O";
  setCurrentPlayer: (player: "X" | "O") => void;
  grid: (string | null)[];
  setGrid: (grid: (string | null)[]) => void;
  resetGame: () => void;
  isOpponentTurn: boolean;
  setOpponentTurn: (turn: boolean) => void;
}

const getStoredState = () => {
  const storedState = localStorage.getItem("gameState");

  if (storedState) {
    try {
      const parsedState = JSON.parse(storedState);

      if (
        parsedState.playerName !== undefined &&
        parsedState.gameRoomId !== undefined &&
        parsedState.gameStatus !== undefined &&
        parsedState.playerMoves !== undefined &&
        parsedState.opponentMoves !== undefined &&
        parsedState.opponentMoves !== undefined &&
        parsedState.grid !== undefined
      ) {
        return parsedState;
      }
    } catch (error) {
      console.error("Error parsing game state from localStorage", error);
    }
  }

  return {
    playerName: "",
    gameStatus: "waiting",
    gameRoomId: "",
    playerMoves: [],
    opponentMoves: [],
    currentPlayer: "X",
    isOpponentTurn: false,
    grid: Array(9).fill(null),
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

  setGameStatus: (status) => {
    set((state) => {
      const newState = { ...state, gameStatus: status };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },

  setPlayerMoves: (moves) => {
    set((state) => {
      const newState = { ...state, playerMoves: moves };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },

  setOpponentMoves: (moves) => {
    set((state) => {
      const newState = { ...state, opponentMoves: moves };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },

  setCurrentPlayer: (player) => {
    set((state) => {
      const newState = { ...state, currentPlayer: player };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },

  setGrid: (grid) => {
    set((state) => {
      const newState = { ...state, grid: grid };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },

  setGameRoomId: (roomId) => {
    set((state) => {
      const newState = { ...state, gameRoomId: roomId };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },

  setOpponentTurn: (turn) => {
    set((state) => {
      const newState = { ...state, isOpponentTurn: turn };
      localStorage.setItem("gameState", JSON.stringify(newState));
      return newState;
    });
  },

  resetGame: () => {
    set({
      playerName: "",
      gameRoomId: "",
      gameStatus: "waiting",
      playerMoves: [],
      opponentMoves: [],
      currentPlayer: "X",
      isOpponentTurn: false,
      grid: Array(9).fill(null),
    });
    localStorage.removeItem("gameState");
  },
}));
