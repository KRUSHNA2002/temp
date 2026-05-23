const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// 🔹 Add Booking
router.post("/add", async (req, res) => {
  try {
    const { name, email, phoneno, date, package: packageType, message } = req.body;

    // Basic validation
    if (!name || !email || !date || !packageType || !phoneno) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const booking = new Booking({
      name,
      email,
      phoneno,
      date,
      package: packageType,
      message: message || "",
    });

    await booking.save();
    res.status(201).json({ message: "Booking added successfully", data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add booking", error: error.message });
  }
});

// 🔹 Get all bookings
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
});

// 🔹 Delete booking
router.delete("/delete/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
});

// 🔹 Update booking
router.put("/update/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

    res.json({ success: true, message: "Booking updated successfully", data: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update booking" });
  }
});

module.exports = router;