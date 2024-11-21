import express from "express";
import http from "http";
import { Server } from "socket.io";
import { handleGameConnections } from "./gameHandlers";
import connectToMongoDb from "./db/connectToMongoDb";
import dotenv from "dotenv";

dotenv.config();

export function startServer(port: number) {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Middleware
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Tick tack toe socket server.");
  });

  // Socket.IO connection handling
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    handleGameConnections(socket, io);
  });

  // Start server
  server.listen(port, () => {
    connectToMongoDb();
    console.log(`Server running on http://localhost:${port}`);
  });
}
