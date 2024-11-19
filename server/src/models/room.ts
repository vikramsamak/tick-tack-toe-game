import mongoose, { Schema, Document, Model } from "mongoose";

interface PlayerInfo {
  name: string;
  socketId: string;
}

interface IRoom extends Document {
  roomId: string;
  playerA: PlayerInfo | null;
  playerB: PlayerInfo | null;
}

const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  socketId: { type: String, required: true },
});

const RoomSchema: Schema<IRoom> = new Schema({
  roomId: { type: String, required: true, unique: true },
  playerA: { type: PlayerSchema, default: null },
  playerB: { type: PlayerSchema, default: null },
});

const Room: Model<IRoom> = mongoose.model<IRoom>("Room", RoomSchema);

export default Room;
