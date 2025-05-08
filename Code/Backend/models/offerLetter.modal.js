const mongoose = require("mongoose");

const OfferLetterSchema = new mongoose.Schema({
  clientWorkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client_works",
    required: true,
  },
  contractorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  labourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  workDays: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("OfferLetters", OfferLetterSchema);
