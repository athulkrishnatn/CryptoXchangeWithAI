import React, { useEffect, useContext } from "react";
import { WatchlistContext } from "../../../context/WatchlistContext"; 
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Tooltip } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

const List = ({ coin }) => {
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext);
  const isFavourite = watchlist.includes(coin.id);

  const toggleFavourite = async (e) => {
    e.preventDefault(); // ✅ Prevent navigation

    try {
      const token = sessionStorage.getItem("token");

      if (isFavourite) {
        await axios.delete(`/api/watchlist/remove/${coin.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          "/api/watchlist/add",
          { coinId: coin.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      toggleWatchlist(coin.id); // ✅ Updates Context
    } catch (error) {
      console.error("Error updating watchlist", error);
    }
  };

  if (!coin) {
    return (
      <tr className="list-row h-full">
        <td colSpan="6" className="text-center text-gray-500 p-4">
          No data available
        </td>
      </tr>
    );
  }

  return (
    <tr className="list-row h-full">
     

      {/* Coin Image & Name */}
      <td className="td-image p-4 flex items-center gap-4 h-full">
        <Tooltip title="Coin Logo">
          {coin.image ? (
            <img
              src={coin.image}
              className="coin-logo hidden sm:block"
              width="35px"
              height="35px"
              alt={coin.name || "Coin"}
            />
          ) : (
            <span>🚀</span> // Fallback emoji if image is missing
          )}
        </Tooltip>
        <div className="ps-4 flex flex-col justify-center h-full">
          <Tooltip title="Coin Symbol">
            <p className="font-semibold uppercase text-xs sm:text-sm">{coin.symbol || "N/A"}</p>
          </Tooltip>
          <p className="text-gray-400 text-xs sm:text-sm">{coin.name || "Unknown"}</p>
        </div>
      </td>

      {/* Price Change in 24H */}
      <Tooltip title="Price Change in 24H">
        <td className="chip-flex flex items-center justify-start gap-4 h-full">
          <div className={`price-chip ${coin.price_change_24h > 0 ? "" : "chip-red"} w-[90px] sm:w-[115px]`}>
            {coin.price_change_24h !== undefined ? `${coin.price_change_24h.toFixed(2)}%` : "N/A"}
          </div>
          <div className={`icon-chip ${coin.price_change_24h > 0 ? "" : "chip-red"} w-[90px] sm:w-[115px]`}>
            {coin.price_change_24h > 0 ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
          </div>
        </td>
      </Tooltip>

      {/* Current Price */}
      <Tooltip title="Current Price" placement="bottom-start">
        <td className="flex items-center h-full">
          <h3
            className="coin-price td-right-align font-semibold text-sm sm:text-base"
            style={{ color: coin.price_change_24h > 0 ? "var(--green)" : "var(--red)" }}
          >
            {coin.current_price !== undefined ? `$${coin.current_price.toLocaleString()}` : "N/A"}
          </h3>
        </td>
      </Tooltip>

      {/* Total Volume */}
      <Tooltip title="Total Volume" placement="bottom-start">
        <td className="flex items-center h-full">
          <p className="total-volume text-xs sm:text-sm text-gray-500">
            {coin.total_volume !== undefined ? coin.total_volume.toLocaleString() : "N/A"}
          </p>
        </td>
      </Tooltip>

      {/* Market Cap */}
      <Tooltip title="Market Cap" placement="bottom-start">
        <td className="flex items-center h-full">
          <p className="total-volume text-xs sm:text-sm text-gray-500">
            {coin.market_cap !== undefined ? coin.market_cap.toLocaleString() : "N/A"}
          </p>
        </td>
      </Tooltip>
    </tr>
  );
};

export default List;
