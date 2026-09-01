import mongoose from "mongoose";

export default async function connectDB() {
  const uri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Missing MONGO_URI or MONGODB_URI environment variable."
    );
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const connection = await mongoose.connect(uri);

  console.log(
    `MongoDB connected: ${connection.connection.host}`
  );

  return connection.connection;
}