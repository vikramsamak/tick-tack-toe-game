import { useGameStore } from "../store/gameStore";

function Footer() {
  const { playerName, playerScore } = useGameStore();
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white  shadow-md p-4 flex justify-between items-center border-t-2 rounded-md">
      <div className="text-lg font-medium">Player: {playerName || "N/A"}</div>
      <div className="text-lg font-medium">
        Score: {playerScore !== undefined ? playerScore : "0"}
      </div>
    </footer>
  );
}

export default Footer;
