const userServices = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const { fullname, email, password } = req.body;
  const { firstname, lastname } = fullname;

  try {
    const hashedPassword = await userServices.hashPassword(password);

    const user = await userServices.createUser({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    return res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userServices.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
