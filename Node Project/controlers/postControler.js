const Post = require("../models/post");
const User = require("../models/user");

//! create a new post

const createPost = async (req, res) => {
  const { content, date } = req.body;
  const postCreated = new Post({ content, date, user: req.user });

  // Update user's posts array
  // const user = await User.findByIdAndUpdate(
  //   { _id: req.user.id },
  //   { $push: { posts: postCreated._id } },
  //   { new: true }
  // );
  await postCreated.save();
  res.send(postCreated);
};

// //? get all posts

const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("comments")
  res.send(posts);
};

// //! get one post

const getMyPosts = async (req, res) => {
  const post = await Post.find({ user: req.user.id });
  res.send(post);
};

// //? update post

const updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate({ _id: req.post.id }, req.body);
  res.send(`${post}
  post updated successfully`);
};

//* delete post

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate({ _id: req.post.id });
  res.send("post deleted successfully");
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  updatePost,
  deletePost,
};
