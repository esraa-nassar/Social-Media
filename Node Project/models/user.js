const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  userName: {
    type: String,
    required: true,
    select: true,
  }}
  ,{
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => { delete ret.id; }
    },
    toObject: {
      virtuals: true,
       
    }

  },
  
);
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

userSchema.pre("save", async function () {
  const currentUser = this;
  if (currentUser.isModified("password")) {
    const hashPassword = await bcrypt.hash(currentUser.password, 10);
    currentUser.password = hashPassword;
  }
});

userSchema.methods.checkPassword = async function (password) {
  const currentUser = this;
  const isMatch = await bcrypt.compare(password, currentUser.password);
  return isMatch;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
