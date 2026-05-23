const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const upload = require("../middleware/upload");
const Employee = require("../models/Employee");

// 🔹 Add Employee
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
        $or: [{ email: req.body.email }, { employeeId: req.body.employeeId }],
      });
      if (existingEmployee) {
        return res.status(409).json({
          message: "Email or Employee ID already exists",
        });
      }

      // 🔹 Hash password
      if (!req.body.password) {
        return res.status(400).json({ message: "Password is required" });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const employee = new Employee({
        ...req.body,
        password: hashedPassword,
        salary,
        profilePicture: req.files.profilePicture[0].filename,
        idDocuments: req.files.idDocuments[0].filename,
      });

      await employee.save();

      res.status(201).json({
        message: "Employee Added Successfully",
        data: employee,
      });
    } catch (error) {
      console.error(error);

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

// 🔹 Get all employees
router.get("/allemployees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch", error: error.message });
  }
});

// 🔹 Delete employee
router.delete("/delete/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

// 🔹 Update employee
router.put(
  "/update/:id",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "idDocuments", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = { ...req.body };

      // 🔹 Hash password if provided (non-empty)
      if (updateData.password && updateData.password.trim() !== "") {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      } else {
        delete updateData.password; // Prevent overwriting existing password
      }

      // 🔹 Convert salary if provided
      if (updateData.salary) {
        updateData.salary = Number(updateData.salary);
      }

      // 🔹 Handle uploaded files
      if (req.files?.profilePicture) {
        updateData.profilePicture = req.files.profilePicture[0].filename;
      }
      if (req.files?.idDocuments) {
        updateData.idDocuments = req.files.idDocuments[0].filename;
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.json({
        message: "Employee Updated Successfully",
        data: updatedEmployee,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Update failed", error: error.message });
    }
  }
);

module.exports = router;