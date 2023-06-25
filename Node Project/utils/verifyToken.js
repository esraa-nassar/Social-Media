const jwt = require("jsonwebtoken");
const AppError = require("./AppError");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  //! get the token check if not found
  const token = req.headers.authorization;
  if (!token) return next(new AppError("provide a token", 404));

  //? comare the token
  const { id } = jwt.verify(token, "esraa is a secret");

  //* get the user and check if not found
  const user = await User.findOne({ _id: id });
  if (!user) return next(new AppError("user not found", 404));

  //! save user
  req.user = user;
  next();
};

module.exports = verifyToken;
