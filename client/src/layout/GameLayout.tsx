import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import { useSocketStore } from "../store/socketStore";
import { useCallback, useEffect } from "react";
import Header from "../components/Header";
import TickTackToeGrid from "../components/TickTackToeGrid";
import Footer from "../components/Footer";
import WinnerModal from "../components/WinnerModal";
import TieModal from "../components/TieModal";
import WaitingModal from "../components/WaitingModal";
import useSocketEvent from "../hooks/useSocketEvent";

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
    isBothPlayerJoined,
    setIsBothPlayerJoined,
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
      if (socket) {
        socket.emit("check_tie", { roomId: gameRoomId, isTie: true });
      }
    }
  };

  const handleReset = () => {
    disconnectSocket();
    resetGame();
    navigate("/");
  };

  useEffect(() => {
    checkWinner();
  }, [grid]);

  const handleWinnerAnnouncement = useCallback((data: { winner: string }) => {
    if (data.winner) {
      setWinner(data.winner);
    }
  }, []);

  useSocketEvent("winner_announcement", handleWinnerAnnouncement);

  const handleGameTie = useCallback((data: { isTie: boolean }) => {
    if (data.isTie) {
      setIsTie(true);
    }
  }, []);

  useSocketEvent("game_tied", handleGameTie);

  const handleBothPlayersJoined = useCallback(
    (data: { isBothPlayerJoined: boolean }) => {
      if (data.isBothPlayerJoined) {
        setIsBothPlayerJoined(true);
      }
    },
    []
  );

  useSocketEvent("both_players_joined", handleBothPlayersJoined);

  const handleOpponentDisConnected = useCallback(
    (data: { isOpponentDisconnected: boolean }) => {
      if (data.isOpponentDisconnected) {
        setIsBothPlayerJoined(false);
      }
    },
    []
  );

  useSocketEvent("opponent_disconnected", handleOpponentDisConnected);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <div className="flex flex-grow h-full justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        {isBothPlayerJoined ? <TickTackToeGrid /> : <WaitingModal />}
      </div>

      {winner && <WinnerModal winner={winner} handleReset={handleReset} />}

      {isTie && <TieModal handleReset={handleReset} />}

      <Footer />
    </div>
  );
}

export default GameLayout;
