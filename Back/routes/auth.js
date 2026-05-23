// backend/routes/auth.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
const crypto = require("crypto");

const router = express.Router();

// Helper: create JWT token
const createToken = (account) =>
  jwt.sign(
    {
      id: account._id,
      username: account.username || `${account.firstName} ${account.lastName}`,
      role: account.role || "employee",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// --------------------- REGISTER ---------------------
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body || {};

    if (!username || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Username, email, role, and password are required" });
    }

    // Username validation
    const usernameRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, and 1 digit",
      });
    }

    const existing = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });
    if (existing) {
      const msg =
        existing.username === username
          ? "Username already taken"
          : "Email already registered";
      return res.status(409).json({ message: msg });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashed,
      role: role || "user",
    });

    const token = createToken(user);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  })
);

// --------------------- LOGIN ---------------------
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { identifier, password } = req.body || {};

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Identifier and password are required" });
    }

    // Try finding in Users first
    let account = await User.findOne({
      $or: [{ username: identifier }, { email: identifier.toLowerCase() }],
    });

    // If not found, try Employee
    if (!account) {
      account = await Employee.findOne({
        $or: [
          { email: identifier.toLowerCase() },
          { employeeId: identifier },
        ],
      });
    }

    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password using bcryptjs
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid username/email/employeeId or password" });
    }

    const token = createToken(account);

    res.json({
      user: {
        id: account._id,
        username: account.username || `${account.firstName} ${account.lastName}`,
        email: account.email,
        role: account.role || "employee",
      },
      token,
    });
  })
);

// --------------------- FORGOT PASSWORD ---------------------
router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email?.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.json({
        message: "If this email exists, a reset link has been sent",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    res.json({
      message: "Reset link generated (PRACTICE MODE)",
      resetUrl,
    });
  })
);

// --------------------- RESET PASSWORD ---------------------
router.post(
  "/reset-password/:token",
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  })
);

module.exports = router;