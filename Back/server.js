process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

// 🔹 ADD THIS
const employeeRoutes = require("./routes/employeeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const galleryRoute = require("./routes/galleryRoute");
const hereSectionRoute = require("./routes/hereSectionRoute");
const AboutRoute = require("./routes/AboutRoute");
const testimonialRoutes = require("./routes/testimonialRoutes");
const blogRoutes = require("./routes/BlogRoutes");
const faqRoute = require("./routes/faqRoute");



const app = express();
connectDB(process.env.MONGO_URI);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// 🔹 ADD THIS
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", authRoutes);

// 🔹 ADD THIS
app.use("/api/employees", employeeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/gallery", galleryRoute);
app.use("/api/herosection", hereSectionRoute);
app.use("/api/about", AboutRoute);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/faq", faqRoute);

app.use("/uploads", express.static("uploads"));

// simple root
app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


