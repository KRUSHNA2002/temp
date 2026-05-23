// routes/AboutRoute.js

const express = require("express");
const multer = require("multer");

const AboutSection = require("../models/About");

const Router = express.Router();


// MULTER STORAGE
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {

    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1E9);

    cb(
      null,
      uniqueSuffix + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });


// ADD / UPDATE ABOUT
Router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      const {
        subtitle,
        title,
        desc1,
        desc2,
        clients,
        experience,
        awards,
      } = req.body;

      // EXISTING DATA
      const existingAbout =
        await AboutSection.findOne();

      // KEEP OLD IMAGE IF NO NEW IMAGE
      const image = req.file
        ? req.file.path
        : existingAbout?.image || "";

      // UPDATE / CREATE
      const aboutEntry =
        await AboutSection.findOneAndUpdate(
          {},
          {
            subtitle,
            title,
            desc1,
            desc2,
            clients,
            experience,
            awards,
            image,
          },
          {
            new: true,
            upsert: true,
          }
        );

      res.status(200).json({
        success: true,
        message:
          "About Updated Successfully",
        aboutEntry,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Update Error",
        error,
      });
    }
  }
);


// GET ABOUT
Router.get("/", async (req, res) => {

  try {

    const aboutEntry =
      await AboutSection.find();

    res.status(200).json({
      success: true,
      message:
        "About Data Fetched Successfully",
      aboutEntry,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Fetch Error",
      error,
    });
  }
});

module.exports = Router;