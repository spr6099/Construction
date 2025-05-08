const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  clientid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // make sure this matches your User model name
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  siteimages: [
    {
      type: String, // will store image filenames or paths
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("completed_works", workSchema);
