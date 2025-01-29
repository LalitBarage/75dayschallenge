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

module.exports.updateTasks = async (userId) => {
  try {
    // Fetch the user to check the last updated date
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Convert both dates to "YYYY-MM-DD" format for comparison
    const lastUpdatedDate = new Date(user.lastUpdatedDate).toISOString().split("T")[0];
    const currentDate = new Date().toISOString().split("T")[0];

    if (lastUpdatedDate === currentDate) {
      throw new Error("You can't complete the tasks more than once per day.");
    }

    // Update the task statuses to true, increment streak, and set the last updated date
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          "tasks.task1": true,
          "tasks.task2": true,
          "tasks.task3": true,
          "tasks.task4": true,
          "tasks.task5": true,
          lastUpdatedDate: Date.now(),
        },
        $inc: { streak: 1 }, // Increment streak by 1
      },
      { new: true } // Return the updated document
    );

    console.log("User updated:", updatedUser);
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating tasks: " + error.message);
  }
};