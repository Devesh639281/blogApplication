const express = require("express");
const {
  allBlogController,
  singleBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
} = require("../controller/userController");
const router = express.Router();
router.get("/all-blogs", allBlogController);
router.get("/single-blog/:_id", singleBlogController);
router.post("/create-blog", createBlogController);
router.put("/update-blog/:_id", updateBlogController);
router.delete("/delete-blog/:_id", deleteBlogController);
module.exports = router;
