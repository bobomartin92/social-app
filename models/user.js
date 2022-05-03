const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  createdAt: String,
  username: String,
  email: String,
  password: String,
});

module.exports = model("users", userSchema);
