import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import { useSocket } from "../hooks/useSocket";

function Home() {
  const {
    playerName,
    setPlayerName,
    setGameStatus,
    currentPlayer,
    setCurrentPlayer,
    gameRoomId,
    setGameRoomId,
  } = useGameStore();

  const { socket } = useSocket();

  const navigate = useNavigate();

  const handleJoinGame = () => {
    if (playerName.trim()) {
      if (socket) {
        socket.emit("join_game", {
          roomId: gameRoomId,
          player: currentPlayer,
        });
      }
      setGameStatus("playing");
      navigate("/play");
    } else {
      alert("Please enter your name to join the game");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="card w-full max-w-md shadow-xl bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Welcome To Tic-Tac-Toe Game
        </h1>
        <p className="text-center mb-6 text-gray-600">
          Enter your name to start playing!
        </p>
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
          Select your sign:
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
