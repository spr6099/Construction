const consultancyModel = require("../models/consultancy.model");
const clientWorkModel = require("../models/clientWork.model");
const bidAmountModel = require("../models/contractorBid.model");
exports.addworks = async (req, res) => {
  try {
    const { clientid, description } = req.body;
    const imageFiles = req.files.map((file) => file.filename); // Store filenames or paths
    console.log(imageFiles);
    console.log(req.body);

    // Example: Save to DB (depends on your schema)
    const newWork = await new consultancyModel({
      clientid,
      description,
      siteimages: imageFiles,
    }).save();

    res.status(201).json({
      success: true,
      message: "Work added successfully",
      data: newWork,
    });
  } catch (error) {
    console.error("Error in addworks:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add work",
      error: error.message,
    });
  }
};

exports.getnewWorks = async (req, res) => {
  try {
    // const { id } = req.body;
    // const response = await clientWorkModel
    //   .find({ consultancyId: id })
    //   .populate("clientId");

    // for view ongoing works
    const response = await clientWorkModel
      .find()
      .populate("clientId")
      .populate("consultancyId");

    await Promise.all(
      response.map((doc) => {
        if (doc.contractorId) return doc.populate("contractorId");
        return doc;
      })
    );

    return res
      .status(200)
      .json({ message: "new  work fetched successfully", data: response });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "error in fetch client works", error: error.message });
  }
};

exports.counterOffer = async (req, res) => {
  try {
    const { clientWorkId, counterAmount, counterDeadline, counterReason } =
      req.body;

    const updatedata = await clientWorkModel.findByIdAndUpdate(
      clientWorkId,
      {
        $set: {
          "counterProposal.Amount": counterAmount,
          "counterProposal.Deadline": counterDeadline,
          "counterProposal.Reason": counterReason,
          "counterProposal.counteredAt": new Date(),
          status: "countered",
        },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .json({ message: "client status updated succesfully", data: updatedata });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error in update status", error: error.message });
  }
};

exports.acceptCounterProposal = async (req, res) => {
  try {
    const { clientWorkId } = req.body;

    const updatedWork = await clientWorkModel.findByIdAndUpdate(
      clientWorkId,
      {
        $set: {
          status: "confirmed",
          acceptedAt: new Date(),
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Proposal accepted", data: updatedWork });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to accept proposal", details: error.message });
  }
};

exports.acceptBidProposal = async (req, res) => {
  try {
    console.log(req.body);

    const { clientWorkId, bidAmount, bidDeadline } = req.body;

    if (!clientWorkId || !bidAmount || !bidDeadline) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updated = await clientWorkModel.findByIdAndUpdate(
      clientWorkId,
      {
        bidProposal: {
          Amount: bidAmount,
          Deadline: new Date(bidDeadline),
          counteredAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Proposal not found." });
    }

    res
      .status(200)
      .json({ message: "Bid submitted successfully", data: updated });
  } catch (error) {
    console.error("Submit bid error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updatework = async (req, res) => {
  try {
    const { id } = req.body;
    // console.log();

    const updatedata = await clientWorkModel.findByIdAndUpdate(
      id,
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

exports.getBidAmounts = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const response = await bidAmountModel
      .find({ consultancyId: id })
      .populate("contractorId");
    console.log(response);

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
