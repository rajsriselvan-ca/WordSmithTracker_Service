import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}
const MongoDbConfig: string = process.env.MONGO_URI;
const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MongoDbConfig);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

export default connectToDatabase;
