import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import { useSocketStore } from "../store/socketStore";
import { useEffect } from "react";
import Header from "../components/Header";
import TickTackToeGrid from "../components/TickTackToeGrid";
import Footer from "../components/Footer";
import WinnerModal from "../components/WinnerModal";
import TieModal from "../components/TieModal";

function GameLayout() {
  const {
    resetGame,
    grid,
    winner,
    setWinner,
    isTie,
    setIsTie,
    playerOName,
    playerXName,
    gameRoomId,
  } = useGameStore();

  const { socket, disconnectSocket } = useSocketStore();

  const navigate = useNavigate();

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;

      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        const winner = grid[a];
        if (winner === "X") {
          setWinner(playerXName);
          if (socket) {
            socket.emit("game_winner", {
              roomId: gameRoomId,
              winner: playerXName,
            });
          }
        } else {
          setWinner(playerOName);
          if (socket) {
            socket.emit("game_winner", {
              roomId: gameRoomId,
              winner: playerOName,
            });
          }
        }
        return;
      }
    }

    if (grid.every((cell) => cell !== null)) {
      setIsTie(true);
    }
  };

  const handleReset = () => {
    disconnectSocket();
    resetGame();
    setWinner(null);
    setIsTie(false);
    navigate("/");
  };

  useEffect(() => {
    checkWinner();
  }, [grid]);

  useEffect(() => {
    if (socket) {
      const handleWinnerAnnouncement = (data: { winner: string }) => {
        setWinner(data.winner);
      };

      socket.on("winner_announcement", handleWinnerAnnouncement);

      return () => {
        socket.off("winner_announcement", handleWinnerAnnouncement);
      };
    }
  }, [socket]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <div className="flex flex-grow h-full justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <TickTackToeGrid />
      </div>

      <button
        onClick={handleReset}
        className="btn-square btn-primary text-white"
      >
        Reset
      </button>

      {winner && <WinnerModal winner={winner} handleReset={handleReset} />}

      {isTie && <TieModal handleReset={handleReset} />}

      <Footer />
    </div>
  );
}

export default GameLayout;
