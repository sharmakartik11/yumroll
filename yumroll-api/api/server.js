const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 5050;
const connectDB = require("../db");
const User = require("../models/User");

//connect to database
connectDB();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

app.get("/api/app", (req, res) => {
  res.status(200).json({ message: "Success from backend!" });
});

//signup API
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findById(username);
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ _id: username, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//login API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user in db
    const user = await User.findById(username);
    if (!user) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    res.status(200).json({ msg: "Login successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
