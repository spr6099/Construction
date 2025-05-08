const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    clientWorkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client_works", // Replace with your actual model name
      required: true,
    },
    contractorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Replace with your user model name
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    billNo: {
      type: String,
      counteredAt: { type: Date }, // timestamp when work was confirmed
    },
    paymentstatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", cartSchema);
