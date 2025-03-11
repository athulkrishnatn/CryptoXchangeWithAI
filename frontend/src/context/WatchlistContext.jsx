import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const API_URL = "https://cryptotrackerai-server.onrender.com/api/watchlist";


  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = sessionStorage.getItem("token"); // Always get latest token
      if (!token) return; //  Prevents unnecessary API calls if not logged in

      try {
        const response = await axios.get(`${API_URL}/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist(response.data.watchlist || []); 
      } catch (error) {
        console.error("Error fetching watchlist:", error.response?.data || error);
      }
    };

    fetchWatchlist();
  }, []); //  Runs only  on mount 

  // Toggle watchlist (Add/Remove)
  const toggleWatchlist = async (coinId) => {
    const token = sessionStorage.getItem("token"); // ✅ Fetch latest token inside function
    if (!token) return; // Prevent API call if user is not logged in

    try {
      if (watchlist.includes(coinId)) {
        // Remove from watchlist in DB
        await axios.delete(`${API_URL}/remove/${coinId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist((prev) => prev.filter((id) => id !== coinId)); // ✅ Update state
      } else {
        // Add to watchlist in DB
        await axios.post(
          `${API_URL}/add`,
          { coinId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWatchlist((prev) => [...prev, coinId]); 
      }
    } catch (error) {
      console.error("Error updating watchlist:", error.response?.data || error);
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
