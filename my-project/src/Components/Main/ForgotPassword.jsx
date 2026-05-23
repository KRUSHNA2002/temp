import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      // ✅ EMAIL MATCH → SHOW RESET LINK IN TOAST
      if (data.resetUrl) {
        toast.success(
          <div>
            <p className="font-semibold mb-1">Reset Password Link</p>
            <p className="text-xs break-all mb-2">
              {data.resetUrl}
            </p>
            <a
              href={data.resetUrl}
              className="text-blue-600 underline text-sm"
            >
              Click to reset password
            </a>
          </div>,
          { autoClose: false }
        );
      } else {
        // ❌ EMAIL NOT FOUND (SECURITY SAFE)
        toast.info(
          "If this email exists, a reset link has been sent."
        );
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-[420px]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email"
              className={`w-full p-3 pl-10 border rounded ${
                emailError ? "border-red-400" : "border-gray-300"
              }`}
            />
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {emailError && (
            <p className="text-sm text-red-500 mt-1">
              {emailError}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full mt-5 bg-blue-600 text-white p-3 rounded"
          >
            {loading ? "Checking..." : "Send Reset Link"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
