const clientWorkModel = require("../models/clientWork.model");
const labourSkillModel = require("../models/labour.model");
const bidAmountModel = require("../models/contractorBid.model");
const cartModel = require("../models/carts.model");
const offerLetterModal = require("../models/offerLetter.modal");

exports.getnewTendors = async (req, res) => {
  try {
    const response = await clientWorkModel
      .find({
        status: "confirmed",
      })
      .populate("consultancyId");
    // console.log(response);

    return res
      .status(200)
      .json({ message: "new  projects fetched successfully", data: response });
  } catch (error) {
    return res.status(400).json({
      message: "error in fetch client projects",
      error: error.message,
    });
  }
};

exports.addBidAmount = async (req, res) => {
  try {
    const {
      clientWorkId,
      contractorId,
      consultancyId,
      counterAmount,
      counterDeadline,
      counterReason,
    } = req.body;
    // console.log(req.body);

    const newBid = new bidAmountModel({
      clientWorkId,
      contractorId,
      consultancyId,
      bidProposal: {
        Amount: counterAmount,
        Deadline: counterDeadline,
        Reason: counterReason,
      },
    });

    await newBid.save();

    return res.status(200).json({
      message: "Bid amount added successfully",
      data: newBid,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error in adding bid amount",
      error: error.message,
    });
  }
};

exports.getBidAmounts = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(id);

    const response = await bidAmountModel
      .find({ contractorId: id })
      .populate("contractorId");
    // console.log(response);

    return res.status(200).json({
      message: "Bid amounts fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error in fetching bid amounts",
      error: error.message,
    });
  }
};

exports.getLabours = async (req, res) => {
  try {
    const getLabours = await labourSkillModel.find().populate("labourId");
    res.status(200).json({
      success: true,
      message: "labours fetched successfully",
      data: getLabours,
    });
    // console.log(getLabours);
  } catch (error) {
    console.error("Error in getLabours", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch skills",
      error: error.message,
    });
  }
};

exports.getAllWorks = async (req, res) => {
  try {
    const response = await clientWorkModel
      .find()
      .populate("consultancyId")
      .populate("clientId")
      .populate("contractorId");
    // console.log(response);

    return res.status(200).json({
      message: "all Works fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error in fetching all works",
      error: error.message,
    });
  }
};

exports.getOneWork = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await clientWorkModel
      .findById(id)
      .populate("consultancyId")
      .populate("clientId")
      .populate("contractorId");
    // console.log(response);

    return res.status(200).json({
      message: "one Work fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error in fetching one work",
      error: error.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    // console.log(req.body);

    const newCart = new cartModel(req.body);

    await newCart.save();

    return res.status(200).json({
      status: true,
      message: "Product added to cart successfully",
      data: newCart,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,

      message: "error in adding product to cart",
      error: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    // console.log(req.body);

    const { clientWorkId, contractorId } = req.body;
    const response = await cartModel
      .find({ clientWorkId: clientWorkId, contractorId: contractorId })
      .populate("clientWorkId")
      .populate("contractorId")
      .populate("products.productId");

    // console.log(response);

    return res.status(200).json({
      status: true,
      message: "one Work fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "error in fetching one work",
      error: error.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cartId } = req.body;

    const updatedata = await cartModel.findByIdAndUpdate(
      cartId,
      { ...req.body },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "client status updated succesfully", updatedata });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in update status", error: error.message });
  }
};

exports.addOfferLetter = async (req, res) => {
  try {
    // console.log(req.body);

    const response = await offerLetterModal(req.body);

    await response.save();

    return res.status(200).json({
      status: true,
      message: "offer Letter added  successfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,

      message: "error in adding offer letter",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const response = await cartModel
      .find({ paymentstatus: "paid" })
      .populate("products.productId");
    // console.log("ll",response);

    return res.status(200).json({
      message: "all products fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error in fetching all products",
      error: error.message,
    });
  }
};

exports.updateworkstatus = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log(req.files);
   

    const newUpdate = {
      message: req.body.message,  
      image: req.files ? req.files.image[0].filename : null,
    };

    const updatedata = await clientWorkModel.findByIdAndUpdate(
      id,
      {
        $push: { progressUpdates: newUpdate },
      },
      {
        new: true,
      }
    );
    console.log(newUpdate);

    return res
      .status(200)
      .json({ message: "client status updated succesfully", updatedata });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in update status", error: error.message });
  }
};
