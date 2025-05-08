const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    consultancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    contractorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    workType: {
      type: String,
      enum: ["interior", "renovation", "construction", "painting"],
      required: true,
    },
    totalSqFt: { type: Number, required: true },
    description: { type: String, required: true },
    proposal: [
      {
        proposalAmount: Number,
        proposalDeadline: Date,
      },
    ],
    siteimages: [
      {
        type: String, // e.g., uploaded image file path or URL
        required: true,
      },
    ],
    status: {
      type: String,
      enum: [
        "pending", // after client submits to consultancy
        "countered", // after consultancy sends counter offer
        "confirmed", // client accepts counter offer
        "rejected", // if either party declines
        "contractor-assigned", // consultancy assigns contractor
        "in-progress", // consultancy starts work
        "completed", // consultancy marks work complete
      ],
      default: "pending",
    },
    counterProposal: {
      // Fixed here
      Amount: { type: Number },
      Deadline: { type: Date },
      Reason: { type: String },
      counteredAt: {
        type: Date, // timestamp when work was confirmed
      },
    },
    contractor: {
      // Fixed here
      Amount: { type: Number },
      Deadline: { type: Date },

      counteredAt: {
        type: Date, // timestamp when work was confirmed
      },
    },
    bidProposal: {
      // Fixed here
      Amount: { type: Number },
      Deadline: { type: Date },
      counteredAt: {
        type: Date, // timestamp when work was confirmed
      },
    },

    acceptedAt: {
      type: Date, // timestamp when work was confirmed
    },
    progressUpdates: [
      {
        message: String,
        image: String, // optional image URL or path
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);
module.exports = mongoose.model("client_works", workSchema);
