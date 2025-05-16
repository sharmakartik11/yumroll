const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB:", mongoose.connection.name);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = connectDB;
