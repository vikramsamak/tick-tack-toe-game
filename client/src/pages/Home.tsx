import { useGameStore } from "../store/gameStore";

function Home() {
  const { playerName, setPlayerName, setGameStatus } = useGameStore();

  const handleJoinGame = () => {
    if (playerName.trim()) {
      setGameStatus("playing");
      console.log(`Player ${playerName} joining the game...`);
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
        <input
          type="text"
          placeholder="Enter your player name"
          className="input input-bordered w-full mb-4 text-gray-200"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button className="btn btn-primary w-full" onClick={handleJoinGame}>
          Join Game
        </button>
      </div>
    </div>
  );
}

export default Home;
