// models/Address.js (CommonJS version)

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  pinCode: { type: String, required: true },
  houseNo: { type: String, required: true },
  area: { type: String, required: true },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  addressType: { type: String, enum: ["Home", "Work"], default: "Home" },
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
