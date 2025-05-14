const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const serverless = require("serverless-http");
const jwt = require("jsonwebtoken");
const connectDB = require("./mongo");
const User = require("../models/User");

const app = express();

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Failed to connect to database" });
  }
});

app.use(cors());
app.use(express.json());

app.get("/api/app", (req, res) => {
  res.status(200).json({ message: "Success from backend!" });
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findById(username);
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ _id: username, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).send("Server error");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findById(username);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = serverless(app);
