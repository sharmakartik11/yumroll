const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
