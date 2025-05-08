const mongoose = require('mongoose');

const bidschema = new mongoose.Schema({
  clientWorkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client_works', // make sure this matches your User model name
    required: true,
  },
  contractorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // make sure this matches your User model name
    required: true,
  },
  consultancyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // make sure this matches your User model name
    required: true,
  },
  bidProposal: {
    // Fixed here
    Amount: { type: Number },
    Deadline: { type: Date },
    Reason: { type: String },
    counteredAt: {
      type: Date, // timestamp when work was confirmed
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('contractorbids', bidschema);