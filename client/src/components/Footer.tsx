import { useGameStore } from "../store/gameStore";

function Footer() {
  const { playerName } = useGameStore();
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md p-2 border-t-2 rounded-md">
      <div className="flex justify-center items-center ">
        <p className="text-lg font-medium">Player: {playerName || "N/A"}</p>
      </div>
    </footer>
  );
}

export default Footer;
