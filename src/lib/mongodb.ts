import mongoose from "mongoose";

const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set");
    return;
  }
  try {
    console.log("Connecting to MongoDB");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongoDB;
