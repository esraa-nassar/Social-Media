const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const {
  createPost,
  getAllPosts,
  getMyPosts,
  updatePost,
  deletePost,
} = require("../controlers/postControler");

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getAllPosts);
router.get("/profile", verifyToken, getMyPosts);
router.put("/edit", verifyToken, updatePost);
router.delete("/delete", verifyToken, deletePost);

module.exports = router;
