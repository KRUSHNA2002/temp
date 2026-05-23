const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // 🔹 import bcrypt at the top
const upload = require("../Back/middleware/upload");
const Employee = require("../Back/models/Employee");

router.post(
  "/add",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "idDocuments", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // 🔹 Check required files
      if (!req.files?.profilePicture || !req.files?.idDocuments) {
        return res.status(400).json({
          message: "Profile picture and ID documents are required",
        });
      }

      // 🔹 Convert salary
      const salary = Number(req.body.salary);
      if (isNaN(salary)) {
        return res.status(400).json({ message: "Salary must be a number" });
      }

      // 🔹 Check duplicate email or employeeId
      const existingEmployee = await Employee.findOne({
        $or: [
          { email: req.body.email },
          { employeeId: req.body.employeeId },
        ],
      });

      if (existingEmployee) {
        return res.status(409).json({
          message: "Email or Employee ID already exists",
        });
      }

      const employee = new Employee({
        ...req.body,
        salary,
        profilePicture: req.files.profilePicture[0].filename,
        idDocuments: req.files.idDocuments[0].filename,
      });

      await employee.save();

      res.status(201).json({
        message: "Employee Added Successfully",
      });
    } catch (error) {
      console.error(error);

      // 🔹 Duplicate key error (MongoDB safety)
      if (error.code === 11000) {
        return res.status(409).json({
          message: "Email or Employee ID already exists",
        });
      }

      res.status(500).json({
        message: "Failed to add employee",
        error: error.message,
      });
    }
  }
);

router.get("/allemployees", async (req, res) => {

  try {
    const employees = await Employee.find();

    res.status(200).json({ success: true, data: employees });
  } catch (error) {

    console.error(error);

    res.status(500).json({ success: false, message: "fail to fetch", error: error.message });

  }

});

// routes/employeeRoutes.js
router.delete("/delete/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.put(
  "/update/:id",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "idDocuments", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (req.files?.profilePicture) {
        updateData.profilePicture = req.files.profilePicture[0].filename;
      }

      if (req.files?.idDocuments) {
        updateData.idDocuments = req.files.idDocuments[0].filename;
      }

      if (updateData.salary) {
        updateData.salary = Number(updateData.salary);
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json({ message: "Employee Updated Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Update failed" });
    }
  }
);




module.exports = router;
