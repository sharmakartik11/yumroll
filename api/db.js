const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://admin:letsyumrollit@yumroll.5utjiyy.mongodb.net/?retryWrites=true&w=majority&appName=YumRoll";

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

module.exports = {
  connectDB,
  client,
};
