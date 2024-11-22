import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import GameLayout from "./layout/GameLayout";
import ProtectedRoute from "./components/ProtectedRoute ";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: "/play",
      element: (
        <ProtectedRoute>
          <GameLayout />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
    },
  ],
  {
    future: {
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
    },
  }
);
