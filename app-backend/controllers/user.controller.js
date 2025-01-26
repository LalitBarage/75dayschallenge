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
  const { firstname, lastname } = fullname; // Destructure fullname object

  try {
    // Hash the password
    const hashedPassword = await userServices.hashPassword(password);

    // Create the user
    const user = await userServices.createUser({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
    });

    // Generate authentication token (assumes your model has this method)
    const token = user.generateAuthToken();

    return res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

