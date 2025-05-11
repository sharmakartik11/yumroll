const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5050;
const { connectDB, client } = require("./db");

//connect to database
connectDB();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

app.get("/api/app", (req, res) => {
  res.status(200).json({ message: "Success from backend!" });
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const db = client.db("yumroll"); // Replace with your actual DB name
    const users = db.collection("users");

    const result = await users.insertOne({ _id: username, password });
    res
      .status(200)
      .json({ message: "User registered", username: result.insertedId });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: "Username already exists" });
    } else {
      console.error("Insert failed:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
