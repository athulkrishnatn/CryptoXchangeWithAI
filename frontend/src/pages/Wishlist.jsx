import React, { useEffect, useState } from "react";
import { get100Coins } from "../functions/get100Coins";
import Grid from "../components/Dashboard/Grid"; // Grid component for display
import Header from "../components/Common/Header";
import Button from "../components/Common/Button";

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  useEffect(() => {
    getData();
    
    // Listen for localStorage changes from other components
    const handleStorageChange = () => {
      setWatchlist(JSON.parse(localStorage.getItem("watchlist")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    getData();
  }, [watchlist]); // Re-fetch data when watchlist changes

  const getData = async () => {
    const allCoins = await get100Coins();
    if (allCoins.length > 0) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  };

  const removeFromWatchlist = (coinId) => {
    const updatedWatchlist = watchlist.filter((id) => id !== coinId);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist); // Update state
  };

  return (
    <div>
      <Header />
      <h1 className="text-center text-2xl font-semibold my-4">Your Watchlist</h1>

      {coins.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {coins.map((coin) => (
            <Grid key={coin.id} coin={coin} removeFromWatchlist={removeFromWatchlist} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-lg text-gray-500">No coins in your watchlist.</h2>
          <div className="mt-4">
            <a href="/dashboard">
              <Button text="Go to Dashboard" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
