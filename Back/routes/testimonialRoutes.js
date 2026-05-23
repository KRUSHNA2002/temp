// routes/testimonialRoutes.js

const express = require("express");

const router = express.Router();

const Testimonial = require("../models/Testimonial");


// ======================
// Add Testimonial
// ======================
router.post("/add", async (req, res) => {

  try {

    const { name, role, review } = req.body;

    if (!name || !role || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const testimonial = new Testimonial({
      name,
      role,
      review,
    });

    await testimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial Added Successfully",
      testimonial,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


// ======================
// Get All Testimonials
// ======================
router.get("/", async (req, res) => {

  try {

    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      testimonials,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


// ======================
// Delete Testimonial
// ======================
router.delete("/:id", async (req, res) => {

  try {

    await Testimonial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

module.exports = router;