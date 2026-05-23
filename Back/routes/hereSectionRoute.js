const express = require('express');
const HeroSection = require('../models/HeroSection');

const Router = express.Router();

// This route will update the existing hero section or create one if it doesn't exist
Router.post("/", async (req, res) => {
  try {
    const { headline, title, desc, btn1, btn2 } = req.body;

    // Update the first document if it exists, otherwise create a new one
    const heroEntry = await HeroSection.findOneAndUpdate(
      {}, // empty filter → affects the first document
      { headline, title, desc, btn1, btn2 }, // new data
      { new: true, upsert: true } // new:true returns updated doc, upsert:true creates if none
    );

    res.status(200).json({ message: "Data Updated Successfully", heroEntry });
  } catch (error) {
    res.status(500).json({ message: "Update Error", error });
  }
});


Router.get("/", async (req, res) => {
  try {

    const heroEntry = await HeroSection.find();

    res.status(200).json({ message: "Data Fetched Successfully", heroEntry });
  } catch (error) {
    res.status(500).json({ message: "Fetched data Error", error });
  }
});

module.exports = Router;