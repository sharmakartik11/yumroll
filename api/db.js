const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
app.use(express.json()); // Parse JSON body

const uri = "mongodb+srv://admin:letsyumrollit@yumroll.5utjiyy.mongodb.net/?retryWrites=true&w=majority&appName=YumRoll";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
  
    try {
      const db = client.db("yumroll"); // Replace with your actual DB name
      const users = db.collection("users");
  
      const result = await users.insertOne({ _id: username, password });
      res.status(200).json({ message: "User registered", username: result.insertedId });
    } catch (err) {
      if (err.code === 11000) {
        res.status(409).json({ error: "Username already exists" });
      } else {
        console.error("Insert failed:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
