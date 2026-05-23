import React, { useState } from "react";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // <-- new role state
  const [loading, setLoading] = useState(false);

  // field-level error states
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const clearErrors = () => {
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    // client-side validation
    let hasError = false;
    if (!username.trim()) {
      setUsernameError("Username is required");
      hasError = true;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setEmailError("Enter a valid email address");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    // include role here
    const registerData = {
      username: username.trim(),
      email: email.trim(),
      password,
      role, // <-- send selected role to backend
    };

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
        credentials: "include",
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await res.json() : null;

      if (!res.ok) {
        const msg = data?.message || "Registration failed";
        if (res.status === 409) {
          if (msg.toLowerCase().includes("username")) {
            setUsernameError(msg);
          } else if (msg.toLowerCase().includes("email")) {
            setEmailError(msg);
          } else {
            setGeneralError(msg);
          }
        } else if (res.status === 400) {
          if (msg.toLowerCase().includes("username")) setUsernameError(msg);
          else if (msg.toLowerCase().includes("email")) setEmailError(msg);
          else if (msg.toLowerCase().includes("password")) setPasswordError(msg);
          else setGeneralError(msg);
        } else {
          setGeneralError(msg);
        }
        console.error("Register error:", data || res.statusText);
        setLoading(false);
        return;
      }

      console.log("Registered:", data);
      navigate("/login");
    } catch (err) {
      console.error("Network or server error:", err);
      setGeneralError("Network error — please check your connection or try again later");
    } finally {
      setLoading(false);
    }
  };

  // small helper to render inline error text
  const ErrorText = ({ children }) =>
    children ? <p className="mt-1 text-sm text-red-500">{children}</p> : null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden ">
    {/* <div className="relative w-full min-h-screen overflow-hidden bg-gray-800"> --- above line is used as this line ( use this line that time remove above div line) */}
      {/* <video
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
      </video> */}

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 "></div>

      <div className="relative z-20 flex items-center justify-center  p-2 ">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-2xl w-full sm:w-[500px] lg:w-[500px]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Assign The Role
          </h1>

          {generalError && (
            <div className="mb-4 px-3 py-2 rounded bg-red-50 border border-red-200 text-red-700">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Username */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError("");
                    if (generalError) setGeneralError("");
                  }}
                  className={`w-full p-3 pl-10 mt-2 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                    usernameError
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter your username"
                  required
                />
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <ErrorText>{usernameError}</ErrorText>
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                    if (generalError) setGeneralError("");
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
              <ErrorText>{emailError}</ErrorText>
            </div>

            {/* Role select (new) */}
            <div>
              <select
                id="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (generalError) setGeneralError("");
                }}
                className="w-full p-3 mt-2 border-2 rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm font-medium text-gray-700"
              >
                <option className="block text-sm font-medium text-gray-700" value="">Select Role</option>
                <option  className="block text-sm font-medium text-gray-700" value="user">User</option>
                {/* keep additional roles only if you actually allow them on the server */}
                <option  className="block text-sm font-medium text-gray-700" value="admin">Admin</option>
                {/* Don't include 'admin' here unless you have strict server-side checks */}
              </select>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                    if (confirmPasswordError && confirmPassword === e.target.value)
                      setConfirmPasswordError("");
                    if (generalError) setGeneralError("");
                  }}
                  className={`w-full p-3 pl-10 mt-2 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <ErrorText>{passwordError}</ErrorText>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) setConfirmPasswordError("");
                    if (generalError) setGeneralError("");
                  }}
                  className={`w-full p-3 pl-10 mt-2 border-2 rounded-lg focus:outline-none focus:ring-2 ${
                    confirmPasswordError
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <ErrorText>{confirmPasswordError}</ErrorText>
            </div>

            {/* Submit */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </motion.div>
          </form>

          {/* <div className="flex justify-center mt-6 text-sm text-gray-600">
            <a href="/login" className="hover:underline text-center">
              Already have an account? Log In
            </a>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
