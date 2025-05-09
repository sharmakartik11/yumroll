const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5050;

// Enable CORS for all origins
app.use(cors());

app.get("/api/app", (req, res) => {
  res.status(200).json({ message: "Success from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});