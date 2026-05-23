const express = require("express");
const router = express.Router();
const multer = require("multer");
const Gallery = require("../models/Gallery"); // import the model


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.get("/", async (req, res) => {
  try {
    const galleryEntry = await Gallery.find(); // ✅ await the promise
    res.status(200).json({ success: true, data: galleryEntry }); // ✅ 200 for GET
    console.log("Gallery fetched:", galleryEntry); // optional
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", upload.array("files", 10), async (req, res) => {

  try {

    const { category } = req.body;

    const savedImages = [];

    for (const file of req.files) {

      const galleryEntry = new Gallery({
        category,
        image: file.path,
      });

      await galleryEntry.save();

      savedImages.push(galleryEntry);
    }

    res.status(201).json({
      message: "Gallery uploaded successfully",
      data: savedImages,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
});

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const galleryEntry = await Gallery.findById(id);

    if (!galleryEntry) {
      return res.status(404).json({
        message: "Gallery not found",
      });
    }

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      message: "Image Deleted Successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;