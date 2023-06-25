const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  body: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
