// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // adjust path if needed

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // username OR email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = (identifier || "").trim();
    const pw = (password || "").trim();

    if (!id || !pw) {
      alert("Please enter your username/email and password.");
      return;
    }

    setLoading(true);

    const payload = { identifier: id, password: pw };
    console.log("[LOGIN] outgoing payload:", payload);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const errData = await res.json();
          alert(errData.message || "Login failed");
          console.error("Login failed:", errData);
        } else {
          const text = await res.text();
          console.error("Non-JSON error response:", text);
          alert("Login failed: server returned an HTML error (check backend)");
        }
        setLoading(false);
        return;
      }

      if (!contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Expected JSON but got:", text);
        alert("Login failed: unexpected server response");
        setLoading(false);
        return;
      }

      // const data = await res.json();
      //  console.log("[LOGIN] success response:", data);

      // if (data.token) localStorage.setItem("token", data.token);
      //  if (data.user) login(data.user);

      // navigate("/dashboard", { replace: true });

        const data = await res.json();
console.log("[LOGIN] success response:", data);

if (data.token) localStorage.setItem("token", data.token);
if (data.user) login(data.user);

// Role-based redirection
if (data.user?.role === "admin") {
  navigate("/admin-dashboard", { replace: true });
} else {
  // default dashboard for normal users
  navigate("/user-dashboard", { replace: true });
}
    } catch (err) {
      console.error("Login error:", err);
      alert("Network or server error — check console and backend logs");
    } finally {
      setLoading(false);
    }

    
  };



  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-800">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://v1.pinimg.com/videos/mc/720p/b8/ab/71/b8ab71c6c1d107d155fa1b75eebe400c.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-2">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[500px] lg:w-[450px]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome Back!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
            <div className="relative">
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full p-3 pl-10 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username or email"
                required
              />
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </motion.div>
          </form>

          <div className="flex flex-col items-center mt-6 text-sm text-gray-600 space-y-2">
            <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
            {/* <a href="/register" className="hover:underline">Don't have an account? Sign Up</a> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
