const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    price: { type: String, trim: true },
    perHour: { type: String,  trim: true },
    img: { type: String, required: true }, // store path to uploaded image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);