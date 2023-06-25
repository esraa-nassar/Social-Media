const express = require("express");
const router = express.Router();
const { model } = require("mongoose");
const verifyToken = require("../utils/verifyToken");
const { loginValid, registrationValid } = require("../utils/Validation");
const {
  register,
  getAllUsers,
  userProfile,
  userUpdated,
  userDeleted,
  login,
} = require("../controlers/userControler");

//* login

router.post("/login", loginValid, login);

//! register

router.post("/", registrationValid, register);

//* get all users

router.get("/", verifyToken, getAllUsers);

//! get one user

router.get("/profile", verifyToken, userProfile);

//? update one user

router.put("/edit", verifyToken, userUpdated);

//* delete one user

router.delete("/delete", verifyToken, userDeleted);

module.exports = router;
