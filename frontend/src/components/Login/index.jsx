import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-normal text-center text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-normal text-lg hover:bg-gray-300 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-300">
          Don't have an account?{" "}
          <span
            className="text-blue-400 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
