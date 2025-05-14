// lib/mongo.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log("MONGOURI", process.env.MONGO_URI);
const MONGODB_URI = process.env.MONGO_URI;


if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in environment variables");
}

let cached = global.mongoose;

if (!cached) {
    console.log("Creating new cached connection");
  cached = global.mongoose = { conn: null, promise: null };
  console.log("Cached connection created");
  connectToDatabase();
}

async function connectToDatabase() {
    console.log("Connecting to MongoDB...");
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
    if (!cached.conn) {
        throw new Error("Failed to connect to MongoDB");
    }
  return cached.conn;
}

export default connectToDatabase;
