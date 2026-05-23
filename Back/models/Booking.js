const mongoose = require("mongoose"); // ✅ Add this at the top

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneno: { type: Number, required: true }, // phone number
    date: { type: Date, required: true },
    package: { type: String, required: true },
    message: { type: String },
    status: {
  type: String,
  enum: ["Pending", "Done"],
  default: "Pending",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);