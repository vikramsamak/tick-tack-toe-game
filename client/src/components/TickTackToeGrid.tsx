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
  } = useGameStore();

  const { socket } = useSocketStore();

  const handleClick = (index: number) => {
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
  };

  useEffect(() => {
    if (socket) {
      const handleMoveMade = (moveData: { player: string; index: number }) => {
        const { player, index } = moveData;
        console.log(player, index);

        if (grid[index] === null) {
          const newGrid = [...grid];
          newGrid[index] = player;
          setGrid(newGrid);

          setOpponentMoves([...opponentMoves, index]);
        }
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
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800 rounded-lg shadow-lg">
      {grid.map((cell, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-20 h-20 border border-gray-600 rounded-lg cursor-pointer transition-transform transform hover:scale-105 bg-gray-700 hover:bg-gray-600"
          onClick={() => handleClick(index)}
        >
          {cell === "X" ? (
            <X className="text-red-500 w-12 h-12" />
          ) : cell === "O" ? (
            <Circle className="text-blue-500 w-12 h-12" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default TickTackToeGrid;
