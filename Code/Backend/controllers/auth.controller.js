const bcrypt = require("bcrypt");
const userModel = require("../models/auth.model");

exports.register = async (req, res) => {
  try {
    const { password, email,name ,contact} = req.body;
    console.log(req.body);
    console.log(req.files);

    const existemail = await userModel.findOne({ email });
    if (existemail) {
      return res.status(400).json({ message: "email already existed" });
    }
    const existuser = await userModel.findOne({ name });
    if (existuser) {
      return res.status(400).json({ message: "name already existed" });
    }
    const existcontact = await userModel.findOne({ contact });
    if (existcontact) {
      return res.status(400).json({ message: "contact already existed" });
    }

    //if password not give then password key not created
    let pswd;
    if (password && password !== "") {
      const salt = await bcrypt.genSalt(10);
      pswd = await bcrypt.hash(password, salt);
    }
    //if password not give then password key not created

    // const authdata = {
    //   ...req.body,
    //   password: pswd,
    //   profile: req.files.profile ? req.files.profile[0].filename : "",
    //   expCert: req.files.expCert ? req.files.expCert[0].filename : "",
    //   regCertificate: req.files.regCertificate ? req.files.regCertificate[0].filename : "",
    // };

    const authdata = {
      ...req.body,
      password: pswd,
      profileImg: req.files.profileImg ? req.files.profileImg[0].filename : "",

      // ...(req.files.expCert && { expCert: req.files.expCert[0].filename }),
      // ...(req.files.regCertificate && {
      //   regCertificate: req.files.regCertificate[0].filename,
      // }),
    };

    const registers = new userModel(authdata);

    await registers.save();
    return res
      .status(200)
      .json({ message: "user added successfully", data: registers });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error in add user", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });

    console.log("auth", user);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({ message: "password is incorrect" });
    }
    if (user.status === "pending") {
      return res.status(404).json({ message: "user not varified by admin" });
    }
    return res.status(200).json({ message: "Login success", user });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Login error", error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const user = await userModel.findById(id);
    console.log(user);

    return res
      .status(200)
      .json({ message: "user getting succesfully  ", user });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "fetching profile error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    // Destructure id from req.body and prepare the update data (exclude id)
    const { id, ...updateData } = req.body;

    // Optionally, if you have a file upload (e.g., "profile") via Multer:
    if (req.files && req.files.profile) {
      // Update the profile field with the filename or path
      updateData.profile = req.files.profile[0].filename;
    }
    if (req.files && req.files.cover) {
      // Update the profile field with the filename or path
      updateData.cover = req.files.profile[0].filename;
    }

    // Update the user document and return the updated document
    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "Error updating profile" });
  }
};

