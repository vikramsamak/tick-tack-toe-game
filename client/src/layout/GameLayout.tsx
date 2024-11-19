import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TickTackToeGrid from "../components/TickTackToeGrid";
import { useGameStore } from "../store/gameStore";
import { useSocketStore } from "../store/socketStore";

function GameLayout() {
  const { resetGame } = useGameStore();
  const { disconnectSocket } = useSocketStore();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <div className="flex flex-grow h-full justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <TickTackToeGrid />
      </div>
      <button
        className="btn-secondary text-white"
        onClick={() => {
          disconnectSocket();
          resetGame();
          navigate("/");
        }}
      >
        Reset
      </button>
      <Footer />
    </div>
  );
}

export default GameLayout;
