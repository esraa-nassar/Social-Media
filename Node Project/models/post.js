const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret.id;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
