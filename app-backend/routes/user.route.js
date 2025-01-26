const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

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

module.exports = router;
