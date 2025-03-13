import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://cryptotrackerai-server.onrender.com/api/auth/register", {
        username: name,
        email,
        password,
      });

      alert(response.data.message || "Signup successful! Please login.");

      // 🔹 Ensure token is NOT stored during signup
      sessionStorage.removeItem("token");  

    
      navigate("/login");  
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 sm:py-10"
      onClick={() => navigate("/")}
    >
    <div className="w-full flex justify-between items-center p-5 absolute top-0">
    <h1 className="text-white text-lg font-medium ps-2">CryptoTrackerAI</h1>
    <h1 className="text-white text-lg font-bold pe-5">Sign Up</h1>
  </div>
      <div 
        className="bg-black border-[2px] border-gray-600/30 p-8 rounded-lg shadow-lg w-96 sm:py-10 sm:mx-7 sm:w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white text-center md:text-2xl lg:text-3xl ">Sign Up</h2>
        <p className="pt-2 pb-5 text-sm text-gray-500 ">Sign up to track and manage your favorite cryptos easily!</p>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <label className="mb-3 font-light" htmlFor="">Username</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md"
          />
          <label className="mb-3 font-light" htmlFor="">Email</label>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md"
          />
          <label htmlFor="password" className="mb-3 font-light">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full text-black bg-white hover:bg-gray-200 py-3 rounded-md"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?
          <span
            className="text-blue-400 cursor-pointer hover:text-blue-500 hover:underline ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
