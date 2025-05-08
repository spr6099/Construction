const userModel = require("../models/auth.model");
const clientWorkModel = require("../models/clientWork.model");

exports.getConsultancys = async (req, res) => {
  try {
    const datas = await userModel.find({ role: "consultancy" });
    // console.log(datas);

    return res
      .status(200)
      .json({ message: "user added successfully", data: datas });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error in add user", error: error.message });
  }
};

exports.addUserWorks = async (req, res) => {
  try {
    const images = req.files?.map((file) => file.filename) || [];
    const proposals = JSON.parse(req.body.proposal); // Parse the proposal from FormData

    const workdata = {
      ...req.body,
      proposal: proposals,

      siteimages: images, // storing as array
    };

    const newWork = new clientWorkModel(workdata);
    await newWork.save();

    return res.status(200).json({
      message: "Work assigned successfully",
      data: newWork,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in assigning work",
      error: error.message,
    });
  }
};

exports.getworkStatus = async (req, res) => {
  try {
    const { id } = req.body;

    const datas = await clientWorkModel
      .find({ clientId: id })
      .populate("consultancyId");
    // console.log(datas);

    return res
      .status(200)
      .json({ message: "workstatus fetched successfully", data: datas });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error in fetch work", error: error.message });
  }
};
