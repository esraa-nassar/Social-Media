const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllComments,
  getOneComment,
  updateComment,
  deleteComment,
} = require("../controlers/commentControler");

router.get("/", getAllComments);

router.get("/:id", getOneComment);

router.post("/", createComment);

router.put("/:id", updateComment);

router.delete("/:id", deleteComment);

module.exports = router;
