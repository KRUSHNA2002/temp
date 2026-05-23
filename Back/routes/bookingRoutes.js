const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

const transporter = require("../config/mail"); // IMPORT MAIL CONFIG

// 🔹 Add Booking
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      email,
      phoneno,
      date,
      package: packageType,
      message,
    } = req.body;

    // Basic validation
    if (!name || !email || !date || !packageType || !phoneno) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // SAVE BOOKING
    const booking = new Booking({
      name,
      email,
      phoneno,
      date,
      package: packageType,
      message: message || "",
    });

    await booking.save();

 

    // =========================
    // CLIENT EMAIL
    // =========================

    const clientMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Photography Booking Confirmation 📸",
      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>Booking Confirmed 📸</h2>

          <p>Hello <b>${name}</b>,</p>

          <p>
            Thank you for booking with us.
            Your booking request has been received successfully.
          </p>

          <div style="background:#f5f5f5;padding:15px;border-radius:10px;">
            <p><b>Package:</b> ${packageType}</p>
            <p><b>Date:</b> ${date}</p>
            <p><b>Phone:</b> ${phoneno}</p>
          </div>

          <br/>

          <p>We will contact you shortly.</p>

          <h3>Your Photography Studio</h3>
        </div>
      `,
    };

    // =========================
    // ADMIN EMAIL
    // =========================

    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Booking Received 📩",
      html: `
        <div style="font-family:Arial;padding:20px;">
          <h2>New Booking Received</h2>

          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phoneno}</p>
          <p><b>Date:</b> ${date}</p>
          <p><b>Package:</b> ${packageType}</p>
          <p><b>Message:</b> ${message}</p>
        </div>
      `,
    };

    // SEND EMAILS
    await transporter.sendMail(clientMail);
    await transporter.sendMail(adminMail);

    res.status(201).json({
      success: true,
      message: "Booking added successfully",
      data: booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add booking",
      error: error.message,
    });
  }
});

// 🔹 Get all bookings
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
});

// 🔹 Delete booking
router.delete("/delete/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
});

// 🔹 Update booking
router.put("/update/:id", async (req, res) => {
  try {
    const updateData = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
});

router.put("/status/:id", async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status =
      booking.status === "Pending"
        ? "Done"
        : "Pending";

    await booking.save();

    res.json({
      success: true,
      status: booking.status,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
    });

  }

});

module.exports = router;