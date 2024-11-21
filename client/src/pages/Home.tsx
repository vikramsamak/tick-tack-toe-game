import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";
import { useSocketStore } from "../store/socketStore";

function Home() {
  const {
    playerName,
    setPlayerName,
    setGameStatus,
    currentPlayer,
    setCurrentPlayer,
    gameRoomId,
    setGameRoomId,
    notification,
    setNotification,
  } = useGameStore();

  const { connectSocket } = useSocket();

  const { socket } = useSocketStore();

  const navigate = useNavigate();

  const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

  useEffect(() => {
    if (!socket) {
      connectSocket(SOCKET_SERVER_URL);
    }
  }, [socket, connectSocket]);

  const handleJoinGame = () => {
    if (playerName.trim()) {
      if (socket) {
        socket.emit("join_game", {
          roomId: gameRoomId,
          player: currentPlayer,
        });
      }
      setGameStatus("waiting");
    } else {
      alert("Please enter your name to join the game");
    }
  };

  useEffect(() => {
    if (socket) {
      const handleSymbolConflict = (data: { isSameSymbol: boolean }) => {
        if (data.isSameSymbol) {
          setGameStatus("waiting");
          setNotification({
            isError: true,
            notificationMsg: "Please choose another symbol.",
          });
        } else {
          setNotification({ isError: false, notificationMsg: "" });
          setGameStatus("playing");
          navigate("/play");
        }
      };

      socket.on("isSameSymbol", handleSymbolConflict);

      return () => {
        socket.off("isSameSymbol", handleSymbolConflict);
      };
    }
  }, [socket, setGameStatus, setNotification, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="card w-full max-w-md shadow-xl bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Welcome To Tic-Tac-Toe Game
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Enter your name to start playing!
        </p>

        {notification.notificationMsg.length > 0 && (
          <div className="alert alert-warning mb-4">
            <span>{notification.notificationMsg}</span>
          </div>
        )}

        <label className="label label-text text-gray-800">Player name:</label>
        <input
          type="text"
          placeholder="Enter your player name"
          className="input input-bordered w-full mb-4 text-gray-200 placeholder:text-gray-200"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <label className="label label-text text-gray-800">Room Id:</label>
        <input
          type="text"
          placeholder="Enter room id"
          className="input input-bordered w-full mb-4 text-gray-200 placeholder:text-gray-200"
          value={gameRoomId}
          onChange={(e) => setGameRoomId(e.target.value)}
        />
        <label className="label label-text text-gray-800">
          Select your symbol:
        </label>
        <select
          className="select select-bordered w-full mb-4 text-gray-200"
          value={currentPlayer}
          onChange={(e) => setCurrentPlayer(e.target.value as "X" | "O")}
        >
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
        <button className="btn btn-primary w-full" onClick={handleJoinGame}>
          Join Game
        </button>
      </div>
    </div>
  );
}

export default Home;
