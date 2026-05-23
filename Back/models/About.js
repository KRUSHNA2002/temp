// models/About.js

const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    desc1: {
      type: String,
      required: true,
      trim: true,
    },

    desc2: {
      type: String,
      required: true,
      trim: true,
    },

    clients: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    awards: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AboutSection",
  aboutSchema
);