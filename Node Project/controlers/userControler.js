const User = require("../models/user");
const { post } = require("../routes/postRoute");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

//! register

const register = async (req, res) => {
  const { email, password, userName } = req.body;
  const userCreated = new User({ email, password, userName });
  //! hashed password pre save
  await userCreated.save();

  //* hide password
  userCreated.password = undefined;
  res.send(userCreated);
};

// login

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("Invalid credentails", 400));

  const userPassword = await user.checkPassword(password);
  if (!userPassword) return next(new AppError("Invalid credentails", 400));
  //* create token
  const token = jwt.sign({ id: user._id }, "esraa is a secret", {
    expiresIn: "2d",
  });

  user.password = undefined;
  res.send({ token, user });
};

//? get all users

const getAllUsers = async (req, res) => {
  const user = await User.find({}).populate("posts");
  res.send(user);
};
// {path:"posts",populate : {path:'comments'}}
//! get one user

const userProfile = async (req, res) => {
  const user = await User.findById({ _id: req.user.id })
    .populate("posts")
    

  //  console.log(user.posts[0].content)
  res.send(user);
};

//? update one user

const userUpdated = async (req, res) => {
  const user = await User.findByIdAndUpdate({ _id: req.user.id }, req.body);
  res.send(`${user}
  user updated successfully`);
};

//* delete one user

const userDeleted = async (req, res) => {
  const user = await User.findByIdAndDelete({ _id: req.user.id });
  res.send("user deleted successfully" + user);
};
module.exports = {
  register,
  login,
  getAllUsers,
  userProfile,
  userUpdated,
  userDeleted,
};
