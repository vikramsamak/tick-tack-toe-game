import { Navigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { gameRoomId, currentPlayer } = useGameStore();

  if (!gameRoomId || !currentPlayer) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
