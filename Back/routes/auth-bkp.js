// backend/routes/auth.js
const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const crypto = require("crypto");
const nodemailer = require("nodemailer");

const router = express.Router();

const createToken = (user) =>
  jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// REGISTER
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    console.log("[REGISTER] incoming body:", req.body);
    const { username, email, password, role } = req.body || {};

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "Username, email , role and password are required" });
    }

    // ✅ Username validation (backend-enforced)
    const usernameRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, and 1 Digit",
      });
    }

    const existing = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });
    if (existing) {
      const msg = existing.username === username ? "Username already taken" : "Email already registered";
      return res.status(409).json({ message: msg });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashed,
      role: role || "user",
    });

    const token = createToken(user);
    console.log("[REGISTER] created user id:", user._id);
    res.status(201).json({
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  })
);

// LOGIN (accepts username OR email)
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    console.log("[LOGIN] incoming body:", req.body); // debug

    // Expect: { identifier: "usernameOrEmail", password: "..." }
    const { identifier, password } = req.body || {};
    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifier and password required" });
    }

    // Try to match by username exactly OR email (lowercased)
    const query = {
      $or: [{ username: identifier }, { email: identifier.toLowerCase() }],
    };

    const user = await User.findOne(query);
    if (!user) {
      console.log("[LOGIN] user not found for identifier:", identifier);
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("[LOGIN] invalid password for user:", user.username);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = createToken(user);
    res.json({
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  })
);


router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Always return same message (security)
    if (!user) {
      return res.json({
        message: "If this email exists, a reset link has been sent",
      });
    }

    // 🔐 Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    /* ------------------------------------------------
       ✅ DEV MODE (TEMP MAIL PRACTICE)
       ------------------------------------------------ */
    if (process.env.NODE_ENV !== "production") {
      console.log("🔁 RESET LINK (DEV):", resetUrl);

      return res.json({
        message: "Reset link generated (DEV MODE)",
        resetUrl, // 👈 visible only for practice
      });
    }

    /* ------------------------------------------------
       📧 PRODUCTION EMAIL (keep for later)
       ------------------------------------------------ */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `<a href="${resetUrl}">Reset Password</a>`,
    });

    res.json({
      message: "If this email exists, a reset link has been sent",
    });
  })
);




router.post(
  "/reset-password/:token",
  asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  })
);


module.exports = router;
