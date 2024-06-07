const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title of Blog is required"],
    },
    description: {
      type: String,
      required: [true, "description of Blog is required"],
    },
    image: {
      type: String,
      required: [true, "image of Blog is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is Required"],
    },
  },
  { timestamps: true }
);
const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
