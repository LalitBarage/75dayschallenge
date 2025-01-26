const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports.createUser = async ({ fullname, email, password }) => {
  if (!fullname.firstname || !fullname.lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    fullname,
    email,
    password,
  });

  return user;
};

module.exports.findUserByEmail = async (email) => {
  return await userModel.findOne({ email }).select("+password");
};
