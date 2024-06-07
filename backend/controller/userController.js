const userModel = require("../model/userModel");
const blogModel = require("../model/blogModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        status: false,
        message: "Username,email,password both fields are required",
      });
    }
    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(200)
        .send({ status: false, message: "User Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send({
      success: true,
      message: "New user Registred Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: false,
        message: "email,password both fields are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).send({
        success: false,
        message: "Enter Correct email",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).send({
        success: true,
        message: "login successfully",
        user,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.getAllUserController = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).send({
      success: true,
      userCount: user.length,
      message: "get All user Data",
      user,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.getSingleUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.params._id });
    res.status(200).send({
      success: true,
      message: "Getting User Data",
      user,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        status: false,
        message: "title,description,image and user Id both fields are required",
      });
    }
    const existingUser = await userModel.findById(user).populate("blogs");
    console.log(existingUser);
    if (!existingUser) {
      return res
        .status(404)
        .send({ status: false, message: "Unable to find User" });
    }
    const newBlog = await blogModel.create({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.newBlog.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
    existingUser.blogs.push(blog);
    await blog.save();
    res.status(201).send({
      success: true,
      message: "New Blog Created Successfully",
      blog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};

exports.allBlogController = async (req, res) => {
  try {
    const blog = await blogModel.find({});
    res.status(200).send({
      success: true,
      userCount: blog.length,
      message: "getting Alll Blogs Which is Present",
      blog,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.singleBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findById({ _id: req.params._id });
    res.status(200).send({
      success: true,
      message: "Getting Single Blog Data",
      blog,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const { _id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(
      _id,
      { title, description, image },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const { _id } = req.params;
    const blog = await blogModel.findByIdAndDelete(_id);
    res.status(200).send({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};
