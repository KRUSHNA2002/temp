    import React, { useState } from "react";
    import { FiMail } from "react-icons/fi";
    import { motion } from "framer-motion";

    const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [generalMessage, setGeneralMessage] = useState("");

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setGeneralMessage("");

        // 🔹 Frontend: only empty check
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
            setEmailError(data.message || "Something went wrong");
            setLoading(false);
            return;
        }

        // Always show success message (security best practice)
        setGeneralMessage(
            "If this email exists, a password reset link has been sent."
        );
        } catch (err) {
        setEmailError("Network error. Please try again later.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center p-2">
        <motion.div
            className="bg-white p-8 rounded-lg shadow-2xl w-full sm:w-[420px]"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Forgot Password
            </h1>

            {generalMessage && (
            <div className="mb-4 px-3 py-2 rounded bg-green-50 border border-green-200 text-green-700">
                {generalMessage}
            </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div>
                <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                    }}
                    className={`w-full p-3 pl-10 mt-2 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                    emailError
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder="Enter your email"
                    required
                />
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {emailError && (
                <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
            </div>

            {/* Submit */}
            <motion.div
                className="mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <button
                type="submit"
                disabled={loading}
                className="w-full p-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                >
                {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </motion.div>
            </form>

            <div className="flex justify-center mt-5 text-sm text-gray-600">
            <a href="/login" className="hover:underline">
                Back to Login
            </a>
            </div>
        </motion.div>
        </div>
    );
    };

    export default ForgotPassword;
