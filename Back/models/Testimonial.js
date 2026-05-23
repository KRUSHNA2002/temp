// models/Testimonial.js

const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);