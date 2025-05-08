const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  labourId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  height: { type: String },
  weight: { type: String },
  exp_certificate: { type: String },
  skills: { type: Array },
  gender: { type: String },
  exp_salary: { type: String },
  age: { type: String },
  // bio: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("labours_skills", skillsSchema);
