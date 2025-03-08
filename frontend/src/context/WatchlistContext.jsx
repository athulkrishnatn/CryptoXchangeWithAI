import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (storedWatchlist) setWatchlist(storedWatchlist);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const API_URL = "http://localhost:5000/api/watchlist";
  const token = sessionStorage.getItem("token"); // Ensure user is authenticated

  const toggleWatchlist = async (coinId) => {
    try {
      if (watchlist.includes(coinId)) {
        // Remove from watchlist
        await axios.delete(`${API_URL}/remove/${coinId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist((prev) => prev.filter((id) => id !== coinId));
      } else {
        // Add to watchlist
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
