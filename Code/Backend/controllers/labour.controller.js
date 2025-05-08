const labourSkillModel = require("../models/labour.model");
const offerLetterModal = require("../models/offerLetter.modal");

exports.addSkills = async (req, res) => {
  try {
    console.log(req.body);
    const { clientid } = req.body;
    // console.log(clientid);

    //  const labSkills = await find

    const labourData = {
      ...req.body,
      exp_certificate: req.files.exp_certificate[0].filename,
    };
    const addSkill = await new labourSkillModel(labourData).save();

    res.status(201).json({
      success: true,
      message: "Skills added successfully",
      data: addSkill,
    });
  } catch (error) {
    console.error("Error in addSkills:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add skills",
      error: error.message,
    });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const { id } = req.body;
    const getSkill = await labourSkillModel.findOne({ labourId: id });
    res.status(200).json({
      success: true,
      message: "Skills fetched successfully",
      data: getSkill,
    });
    console.log(getSkill);
  } catch (error) {
    console.error("Error in getSkills", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch skills",
      error: error.message,
    });
  }
};

exports.updateSkills = async (req, res) => {
  try {
    const { skillid } = req.body;

    const labourData = {
      ...req.body,
      exp_certificate: req.files?.exp_certificate?.[0]?.filename,
    };

    const editSkill = await labourSkillModel.findByIdAndUpdate(
      { _id: skillid },
      labourData,
      { new: true } // optional: returns updated doc
    );

    res.status(201).json({
      success: true,
      message: "Skills updated successfully",
      data: editSkill,
    });
  } catch (error) {
    console.error("Error in updateSkills:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update skills",
      error: error.message,
    });
  }
};

exports.getOfferLetters = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await offerLetterModal
      .find({ labourId: id })
      .populate("contractorId");
    res.status(200).json({
      success: true,
      message: "offer letters fetched successfully",
      data: response,
    });
    console.log(response);
  } catch (error) {
    console.error("Error in getOfferLetters", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch offer letters",
      error: error.message,
    });
  }
};

exports.updateOfferLetter = async (req, res) => {
  try {
    const { offerId } = req.body;

    // console.log(offerId);
    // console.log(req.body);

    const response = await offerLetterModal.findByIdAndUpdate(
      { _id: offerId },
      { ...req.body },
      { new: true } // optional: returns updated doc
    );

    res.status(201).json({
      success: true,
      message: "offerLetter updated successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error in update offerLetter:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update offerLetter",
      error: error.message,
    });
  }
};

exports.getWorkers = async (req, res) => {
  try {
    
    
    const response = await offerLetterModal
      .find()
      .populate("labourId");
    res.status(200).json({
      success: true,
      message: "workers fetched successfully",
      data: response,
    });
    // console.log("data", response);
  } catch (error) {
    console.error("Error in getWorkers", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch offer letters",
      error: error.message,
    });
  }
};
