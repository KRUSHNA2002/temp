const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Service = require("../models/Service");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/services";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST new service
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { title, desc,price ,perHour} = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const imgPath = `uploads/services/${req.file.filename}`;
    const newService = new Service({ title, desc,price,perHour, img: imgPath });
    await newService.save();

    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a service
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // Update fields if provided
    service.title = req.body.title || service.title;
    service.desc = req.body.desc || service.desc;
  service.price = req.body.price?.trim() !== "" ? req.body.price : service.price;
service.perHour = req.body.perHour?.trim() !== "" ? req.body.perHour : service.perHour;

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (service.img && fs.existsSync(service.img)) fs.unlinkSync(service.img);
      service.img = `uploads/services/${req.file.filename}`;
    }

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// DELETE a service
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });

    // Delete image file if it exists
    if (service.img && fs.existsSync(service.img)) {
      fs.unlinkSync(service.img);
    }

    // Delete the service from DB
    await service.deleteOne(); // .deleteOne() is safer than .delete()

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;