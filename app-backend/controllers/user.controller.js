const userServices = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }
  const { firstname, lastname, email, password } = req.body;

  const hashedPassword = await userServices.hashPassword(password);

  const user = await userServices.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  return res.status(201).json(token, user);
};
