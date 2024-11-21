import { Server, Socket } from "socket.io";
import Room from "./models/room";

export async function handleGameConnections(socket: Socket, io: Server) {
  // Join a game room
  socket.on("join_game", async (data) => {
    const { roomId, player } = data;
    const playerSocketId = socket.id; // Player's socket ID

    try {
      let room = await Room.findOne({ roomId });

      if (!room) {
        // If room doesn't exist, create a new room and assign player A
        room = new Room({
          roomId,
          playerA: { player, socketId: playerSocketId },
        });
        await room.save();
        console.log(
          `Player A (${player}, ${playerSocketId}) created and joined room ${roomId}`
        );
      } else if (!room.playerB) {
        // If room exists and player B slot is empty
        if (room.playerA?.player === player) {
          // Notify the player to choose a different symbol
          socket.emit("isSameSymbol", { isSameSymbol: true });
          return;
        }

        // Assign player B
        room.playerB = { player, socketId: playerSocketId };
        await room.save();
        console.log(
          `Player B (${player}, ${playerSocketId}) joined room ${roomId}`
        );
      } else {
        // Room is full
        socket.emit("room_full", { message: "Room is already full" });
        return;
      }

      // Notify the player that the symbol is valid
      socket.emit("isSameSymbol", { isSameSymbol: false });

      // Add the player to the socket room
      socket.join(roomId);

      if (room.playerA && room.playerB) {
        console.log("Both players are in the room. Game starting!");
        io.to(roomId).emit("both_players_joined", {
          message: "Game has started! Player B has joined.",
        });
      }
    } catch (error) {
      console.error("Error joining game:", error);
      socket.emit("error", { message: "Failed to join the game." });
    }
  });

  // Handle player moves
  socket.on("playerMove", async (data) => {
    const { roomId, player, index } = data;

    try {
      const room = await Room.findOne({ roomId });

      if (room) {
        const opponent =
          room.playerA?.player === player ? room.playerB : room.playerA;

        if (opponent) {
          io.to(opponent.socketId).emit("move_made", { player, index });
          console.log(
            `Player ${player} made a move in room ${roomId} at index ${index}`
          );
        } else {
          console.log(`Move made by ${player}, but no opponent to notify.`);
        }
      } else {
        console.log(`Room ${roomId} does not exist.`);
      }
    } catch (error) {
      console.error("Error handling player move:", error);
      socket.emit("error", { message: "Failed to process the move." });
    }
  });

  socket.on("game_winner", async (data) => {
    const { roomId, winner } = data;

    io.to(roomId).emit("winner_announcement", { winner });
  });

  // Handle disconnect
  socket.on("disconnect", async () => {
    try {
      const room = await Room.findOne({
        $or: [
          { "playerA.socketId": socket.id },
          { "playerB.socketId": socket.id },
        ],
      });

      if (room) {
        if (room.playerA?.socketId === socket.id) {
          room.playerA = null;
        } else if (room.playerB?.socketId === socket.id) {
          room.playerB = null;
        }

        // Delete room if both players are gone
        if (!room.playerA && !room.playerB) {
          await Room.deleteOne({ _id: room._id });
          console.log(`Room ${room.roomId} has been removed.`);
        } else {
          await room.save();
          console.log(`Player disconnected from room ${room.roomId}`);
        }

        // Notify the remaining player in the room
        const remainingPlayer = room.playerA || room.playerB; // Only one player will be left
        if (remainingPlayer) {
          io.to(remainingPlayer.socketId).emit("opponent_disconnected", {
            message: "Your opponent has disconnected.",
          });
        }
      }
    } catch (error) {
      console.error("Error handling disconnect:", error);
    }
  });
}
