const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isString()
      .isLength({ min: 2 })
      .withMessage("First name is not valid"),
    body("fullname.lastname")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Last name is not valid"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 6 }).withMessage("Password is too short"),
  ],
  userController.registerUser
);

router.post("/login", userController.loginUser);

router.post("/profile", authMiddleware.authUser, userController.getUserProfile);

module.exports = router;
