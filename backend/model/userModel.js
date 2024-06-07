const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "userName is Required"],
    },
    email: {
      type: String,
      required: [true, "mobile is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
