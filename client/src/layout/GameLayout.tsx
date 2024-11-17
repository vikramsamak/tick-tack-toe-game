import Footer from "../components/Footer";
import Header from "../components/Header";
import TickTackToeGrid from "../components/TickTackToeGrid";

function GameLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <div className="flex flex-grow h-full justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <TickTackToeGrid />
      </div>
      <Footer />
    </div>
  );
}

export default GameLayout;
