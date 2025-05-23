const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    address: { type: String, required: true, unique: true },
    balance: { type: String, required: true },  
    gasPrice: { type: String, required: true },
    blockNumber: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
