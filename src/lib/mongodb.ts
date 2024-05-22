import mongoose from "mongoose";

const connectMongoDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongoDB;
