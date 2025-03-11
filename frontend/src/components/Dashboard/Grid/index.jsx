import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { WatchlistContext } from "../../../context/WatchlistContext";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";


const Grid = ({ coin }) => {
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsFavourite(watchlist.includes(coin.id));
  }, [watchlist, coin.id]);

  const toggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWatchlist(coin.id);

    setIsFavourite((prev) => {
      const newFavouriteStatus = !prev;

      if (newFavouriteStatus) {
        toast.success(`${coin.name} added to watchlist`);
      } else {
        toast.info(`${coin.name} removed from watchlist`);
      }

      return newFavouriteStatus;
    });
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container border-gray-400/30 hover:border-gray-400 hover:scale-105 transition-all  duration-300  border-[2px] relative overflow-hidden ${
          coin.price_change_percentage_24h < 0 ? "grid-container-red" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
       

       
 

        <div className="info-flex p-4 gap-4 relative z-10">
          <img src={coin.image} className="coin-logo" width="50px" height="50px" />
          <div>
            <p className="font-semibold uppercase">{coin.symbol}</p>
            <p className="text-gray-400 text-sm">{coin.name}</p>
          </div>

          {/* Favourite Icon */}
          <div className="absolute top-2.5 right-2.5 cursor-pointer" onClick={toggleFavourite}>
            {isFavourite ? <StarIcon className="text-yellow-400" /> : <StarBorderOutlinedIcon />}
          </div>
        </div>

        {/* Price Change Section */}
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

        {/* Market Information */}
        <div className="info-container relative z-10">
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
