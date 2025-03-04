import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-light text-center text-white mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-light text-lg hover:bg-gray-300 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <span
            className="text-blue-400 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
