const userService = require("../services/user.service");
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
    const hashedPassword = await userService.hashPassword(password);

    const user = await userService.createUser({
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
    const user = await userService.findUserByEmail(email);

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

module.exports.getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is passed via authentication (JWT)

    // Call the service layer to update tasks
    const updatedUser = await userService.updateTasks(userId);

    res.status(200).send({
      message: "Tasks updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
