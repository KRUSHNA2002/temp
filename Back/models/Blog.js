const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    excerpt: String,
    fullText: String,
    date: {
      type: String,
      default: new Date().toDateString(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);