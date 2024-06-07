const express = require("express");
const {
  registerController,
  loginController,
  getAllUserController,
  getSingleUserController,
} = require("../controller/userController");
const router = express.Router();

//POST||Register
router.post("/register", registerController);
//POST||Login
router.post("/login", loginController);
//GET||Getting all user data
router.get("/get-allUser", getAllUserController);
//GET||GettingSingle User Data
router.get("/get-singleUser/:_id", getSingleUserController);
module.exports = router;
