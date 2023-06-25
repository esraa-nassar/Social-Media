const Comment = require("../models/comment");

//! create a new Comment

const createComment = async (req, res) => {
  const { body } = req.body;
  const CommentCreated = new Comment({ body, post: req.post });
  await CommentCreated.save();
  res.send(CommentCreated);
};

// //? get all Comments

const getAllComments = async (req, res) => {
  const comments = await Comment.find({});
  res.send(comments);
};

// //! get one Comment

const getOneComment = async (req, res) => {
  const comment = await Comment.findById({ _id: req.params.id });
  res.send(comment);
};

// //? update Comment

const updateComment = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.send(`${comment}
  Comment updated successfully`);
};

//* delete Comment

const deleteComment = async (req, res) => {
  const comment = await Comment.findByIdAndDelete({ _id: req.params.id });
  res.send("Comment deleted successfully");
};

module.exports = {
  createComment,
  getAllComments,
  getOneComment,
  updateComment,
  deleteComment,
};
