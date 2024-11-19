import { X, Circle } from "lucide-react";
import { useGameStore } from "../store/gameStore";
import { useSocketStore } from "../store/socketStore";
import { useEffect } from "react";

function TickTackToeGrid() {
  const {
    grid,
    setGrid,
    playerMoves,
    setPlayerMoves,
    currentPlayer,
    setOpponentMoves,
    opponentMoves,
    gameRoomId,
    setCurrentPlayer,
    isOpponentTurn,
    setOpponentTurn,
  } = useGameStore();

  const { socket } = useSocketStore();

  const handleClick = (index: number) => {
    if (!isOpponentTurn) {
      if (grid[index] !== null) return;

      const newGrid = [...grid];

      newGrid[index] = currentPlayer;

      setGrid(newGrid);

      setPlayerMoves([...playerMoves, index]);

      if (socket) {
        socket.emit("playerMove", {
          roomId: gameRoomId,
          index,
          player: currentPlayer,
        });
      }
      setOpponentTurn(true);
    }
  };

  useEffect(() => {
    if (socket) {
      const handleMoveMade = (moveData: { player: string; index: number }) => {
        const { player, index } = moveData;

        if (grid[index] === null) {
          const newGrid = [...grid];

          newGrid[index] = player;

          setGrid(newGrid);

          setOpponentMoves([...opponentMoves, index]);
        }

        setOpponentTurn(false);
      };

      socket.on("move_made", handleMoveMade);

      return () => {
        socket.off("move_made", handleMoveMade);
      };
    }
  }, [
    socket,
    grid,
    playerMoves,
    opponentMoves,
    setGrid,
    setPlayerMoves,
    setOpponentMoves,
    setCurrentPlayer,
  ]);

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800 rounded-lg shadow-lg">
        {grid.map((cell, index) => (
          <button
            key={index}
            disabled={isOpponentTurn}
            className={`flex items-center justify-center w-20 h-20 border border-gray-600 rounded-lg cursor-pointer transition-transform transform hover:scale-105 bg-gray-700 hover:bg-gray-600 ${
              isOpponentTurn && "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => handleClick(index)}
          >
            {cell === "X" ? (
              <X className="text-red-500 w-12 h-12" />
            ) : cell === "O" ? (
              <Circle className="text-blue-500 w-12 h-12" />
            ) : null}
          </button>
        ))}
      </div>
      <div className="text-center py-4">
        {isOpponentTurn ? "Opponent's Turn" : "Your Turn"}
      </div>
    </div>
  );
}

export default TickTackToeGrid;
