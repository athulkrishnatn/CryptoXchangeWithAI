import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { WatchlistContext } from "../../context/WatchlistContext"; 

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setWatchlist } = useContext(WatchlistContext);

  const [dots, setDots] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://cryptotrackerai-server.onrender.com/api/auth/login",
        { email, password }
      );

      const { token } = response.data;

      if (token) {
        sessionStorage.setItem("token", token);

        // ✅ Fetch Watchlist after login
        try {
          const watchlistResponse = await axios.get(
            "https://cryptotrackerai-server.onrender.com/api/watchlist/get",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setWatchlist(watchlistResponse.data.watchlist || []); 
        } catch (watchlistError) {
          console.error("Failed to fetch watchlist:", watchlistError);
        }

        if (onLoginSuccess) onLoginSuccess();

      
          navigate("/about");
     
      } else {
        throw new Error("Invalid login response. No token received.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 sm:my-10">
      <div className="w-full flex justify-between items-center p-5 absolute top-0">
        <h1 className="text-white text-lg font-medium ps-2">CryptoTrackerAI</h1>
        <h1 className="text-white text-lg font-bold pe-5">Sign In</h1>
      </div>

      <div className="bg-black border-[2px] border-gray-400/30 p-8 rounded-lg shadow-lg w-96 sm:w-sm">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Sign in to Cryptotracker AI
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="py-3 font-light">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md"
          />
          <label className="py-3 font-light">Password</label>
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
            style={{ minWidth: "150px" }}
            disabled={loading}
            className="w-full bg-gray-100 text-black hover:bg-gray-200 py-3 rounded-md flex justify-center"
          >
            {loading ? (
              <>
                Signing In
                <span className="inline-block w-[1ch] text-center">{dots}</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center justify-center pt-4">
          New User?{" "}
          <Link to={"/signup"} className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
