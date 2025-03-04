import React, { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Link } from "react-router-dom";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";

const Grid = ({ coin, removeFromWatchlist }) => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const [isFavourite, setIsFavourite] = useState(watchlist.includes(coin.id));

  const toggleFavourite = (e) => {
    e.preventDefault();
    let updatedWatchlist;

    if (isFavourite) {
      updatedWatchlist = watchlist.filter((id) => id !== coin.id);
      removeFromWatchlist(coin.id);
    } else {
      updatedWatchlist = [...watchlist, coin.id];
    }

    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setIsFavourite(!isFavourite);
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container relative ${
          coin.price_change_percentage_24h < 0 && "grid-container-red relative"
        }`}
      >
        <div className="info-flex p-4 gap-4">
          <img src={coin.image} className="coin-logo" width="50px" height="50px" />
          <div>
            <p className="font-semibold uppercase">{coin.symbol}</p>
            <p className="text-gray-400 text-sm">{coin.name}</p>
          </div>
          <div className="absolute top-2.5 right-2.5 cursor-pointer" onClick={toggleFavourite}>
            {isFavourite ? <StarIcon className="text-yellow-400" /> : <StarBorderOutlinedIcon />}
          </div>
        </div>

        {coin.price_change_24h > 0 ? (
          <div className="chip-flex flex justify-start gap-4 items-center m-4">
            <div className="price-chip">{coin.price_change_24h.toFixed(2)}%</div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex flex justify-start gap-4 items-center m-4">
            <div className="price-chip chip-red">{coin.price_change_24h.toFixed(2)}%</div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}

        <div className="info-container">
          <h3
            className="coin-price font-semibold"
            style={{ color: coin.price_change_24h > 0 ? "var(--green)" : "var(--red)" }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="total-volume text-sm text-gray-500 pt-3 pb-2">
            Total Volume: {coin.total_volume.toLocaleString()}
          </p>
          <p className="total-volume text-sm text-gray-500">
            Market Cap: {coin.market_cap.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Grid;
