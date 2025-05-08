const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true },

  // contact: { type: Number, required: true, unique: true },

  contact: {
    type: String,
    required: true,
    match: [
      /^[\+]?[0-9]{1,4}[-\s]?[0-9]{1,4}[-\s]?[0-9]{6,15}$/,
      "Please provide a valid phone number",
    ],
  },
  address: { type: String },
  profileImg: { type: String },
  bio: { type: String },

  //   labour
  // height: { type: String },
  // weight: { type: String },
  // expCert: { type: String },
  // gender: { type: String },
  // dob: { type: String },
  // expSalary: { type: String },
  // income: { type: Number },
  // skills: { type: [String], default: [] },

  // //   consultancy
  // licenseNo: { type: String },
  // expYears: { type: Number },
  // regCertificate: { type: String },
  // certifications: { type: String },
  // gst: { type: String },
  // services: { type: [String], default: [] },

  // //   supplier
  // products: { type: [String], default: [] },

  status: {
    type: String,
    default: "pending",
    enum: ["approved", "pending"],
  },
});

module.exports = mongoose.model("users", regSchema);
