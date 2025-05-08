const userModel = require("../models/auth.model");

exports.getAlluserdata = async (req, res) => {
  try {
    const userdata = await userModel.find();
    return res.status(200).json({ message: "user get successfully", userdata });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error in getuserdata", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await userModel.findByIdAndDelete(id); // Pass ID directly
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, status } = req.body;

    const updatedata = await userModel.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "user updated succesfully", updatedata });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in update user", error: error.message });
  }
};
