const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  createdAt: String,
  username: String,
  body: String,
  comments: [
    {
      body: String,
      createdAt: String,
      username: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("posts", postSchema);
