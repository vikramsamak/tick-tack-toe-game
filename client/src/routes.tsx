import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import GameLayout from "./layout/GameLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/play",
    element: <GameLayout />,
    errorElement: <Error />,
  },
]);
