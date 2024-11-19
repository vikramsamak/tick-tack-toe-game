import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Error:", error);
  }
};

export default connectToMongoDb;
