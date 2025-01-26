const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

// Function to hash passwords
module.exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
  return await bcrypt.hash(password, salt); // Hash and return the password
};

// Function to create a new user
module.exports.createUser = async ({ fullname, email, password }) => {
  // Validate all required fields
  if (!fullname.firstname || !fullname.lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  // Create and save the user in the database
  const user = await userModel.create({
    fullname,
    email,
    password,
  });

  return user;
};


