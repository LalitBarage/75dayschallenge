const userModel = require("../models/user.model");

module.exports.createUser =
  async (req, res) =>
  ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = new userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });
    return user;
  };
