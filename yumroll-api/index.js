const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User");

const app = express();
const PORT = 5050;

(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("Fatal DB connection error");
  }
})();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Yumroll API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findById(username);
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: username, // Set username as the _id
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findById(username); // _id is username
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});
