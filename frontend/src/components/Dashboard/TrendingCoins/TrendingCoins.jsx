import React, { useEffect, useState } from "react";
import { get100Coins } from "../../../functions/get100Coins"; 
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Loader from "@/components/Common/Loader";

const TrendingCoins = () => {
  const [topCoins, setTopCoins] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [coinImages, setCoinImages] = useState({}); 
  const [marketStats, setMarketStats] = useState({
    priceChange: 0,
    volume: 0,
    highPrice: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    get100Coins().then((coins) => {
      const images = {};
      coins.forEach((coin) => {
        images[coin.symbol.toUpperCase() + "USDT"] = coin.image; 
      });
      setCoinImages(images);
    });

   
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

     
      const selectedCoins = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT"];
      const top5Coins = data
        .filter((coin) => selectedCoins.includes(coin.s))
        .map((coin) => ({
          symbol: coin.s,
          price: parseFloat(coin.c),
          change: parseFloat(coin.P),
        }));

      // Market Stats (Using BTC as reference)
      const btcData = data.find((coin) => coin.s === "BTCUSDT");
      if (btcData) {
        setMarketStats({
          priceChange: parseFloat(btcData.P),
          volume: parseFloat(btcData.q),
          highPrice: parseFloat(btcData.h)
        });
      }

      // Sort for gainers and losers
      const sortedData = data
        .map((coin) => ({
          symbol: coin.s,
          price: parseFloat(coin.c),
          change: parseFloat(coin.P),
        }))
        .sort((a, b) => b.change - a.change);

      setTopCoins(top5Coins);
      setGainers(sortedData.slice(0, 5)); // Top 5 gainers
      setLosers(sortedData.slice(-5).reverse()); // Top 5 losers

      setLoading(false);
    };

    return () => socket.close();
  }, []);

  if(loading){
    return <Loader/>
  }

  return (
    <div className="pt-18">
      <h1 className="text-4xl font-bold ms-8">Today's CryptoCurrency Prices by Market Cap</h1>
      <p className="text-lg font-light text-gray-400 py-3 ms-8">
      The worldwide cryptocurrency market capitalization today stands at an estimated $2.7T , seeing a 0.13% movement over the last 24 hours. The total cryptocurrency trading volume in the past day is roughly $187B. Bitcoin's market dominance is at about 58.9%.
      </p>

      {/* Market Stats Row */}
      <div className="flex flex-row  gap-10  px-8 py-6 text-white rounded-lg shadow-md">
  {/* 24h Price Change */}
  <div className="w-[250px] min-h-[100px] border-[3px] border-gray-400/30  hover:border-gray-500 px-6 py-4 rounded-2xl text-center hover:shadow-lg transition-all duration-300 bg-gray-950 hover:scale-105">
    <h2 className="text-lg font-semibold pb-2 text-gray-400">24h Price Change</h2>
    <p className={`text-xl flex items-center justify-center gap-2 ${marketStats.priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
      {marketStats.priceChange.toFixed(2)}% {marketStats.priceChange > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
    </p>
  </div>

  {/* 24h Trading Volume */}
  <div className="w-[250px] min-h-[100px] border-[3px] border-gray-400/30 px-6 py-4 rounded-2xl  hover:border-gray-500 text-center hover:shadow-lg transition-all duration-300  bg-gray-950 hover:scale-105">
    <h2 className="text-lg font-semibold pb-2 text-gray-400">24h Trading Volume</h2>
    <p className="text-xl text-green-400">${marketStats.volume.toLocaleString()} </p>
  </div>

  {/* 24h High Price */}
  <div className="w-[250px] min-h-[100px] border-[3px] border-gray-400/30 px-6 py-4 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:border-gray-500  bg-gray-950 hover:scale-105">
    <h2 className="text-lg font-semibold pb-2 text-gray-400">24h High Price</h2>
    <p className="text-xl text-green-400">${marketStats.highPrice.toFixed(2)}</p>
  </div>
</div>


      {/* Main Grid */}
      <div className="pt-1 grid grid-cols-3 mb-20 ms-8 text-white">
        {/* Top 5 Coins */}
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl mb-1 mt-6 font-bold">
            Trending Coins <WhatshotIcon className="text-yellow-300 mb-1 animate-pulse"/>
          </h1>
          <div className="border-[2px] rounded-2xl border-gray-400/30 hover:shadow-lg  hover:border-gray-500 transition-all duration-300">
            {topCoins.map((coin) => (
              <div key={coin.symbol} className="w-[500px] px-6 py-3 flex justify-between rounded-lg shadow-md text-center hover:bg-gray-800 transition-all duration-300 hover:scale-105">
               <div className="flex items-center px-2">
                    <img
                      src={coinImages[coin.symbol] || "/placeholder.png"} // Use cached image
                      alt={coin.symbol}
                      className="w-10 h-10 "
                    />
                    <h3 className="justify-center items-center text-lg font-semibold px-2">{coin.symbol.replace("USDT", "")}</h3>
               </div>
                <p className="text-xl font-bold">${coin.price.toFixed(2)}</p>
                <p className={`text-sm ${coin.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {coin.change.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gainers & LOsers */}
        <div className="col-span-2">
          <div className="mt-8 justify-center gap-10 mb-5">
            
            <div>
              <h2 className="text-2xl font-bold text-center mb-4">
                Top 5 Gainers <TrendingUpIcon className="text-green-400"/>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {gainers.map((coin) => (
                  <div key={coin.symbol} className="w-40 p-4 border-[2px]  hover:border-gray-500 border-gray-400/30 rounded-lg shadow-md text-center transition-all duration-300 hover:scale-110 hover:shadow-glow hover:bg-gray-800">
                    <h3 className="text-lg font-semibold">{coin.symbol.replace("USDT", "")}</h3>
                    <p className="text-xl font-bold">${coin.price.toFixed(2)}</p>
                    <p className="text-sm text-green-400">+{coin.change.toFixed(2)}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/*  Losers */}
            <div className="mt-5">
              <h2 className="text-2xl font-bold text-center mb-4">
                Top 5 Losers <TrendingDownIcon className="text-red-400"/>
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {losers.map((coin) => (
                  <div key={coin.symbol} className="w-40 p-4  hover:border-gray-500 border-[2px] border-gray-400/30 rounded-lg shadow-md text-center hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                    <h3 className="text-lg font-semibold">{coin.symbol.replace("USDT", "")}</h3>
                    <p className="text-xl font-bold">${coin.price.toFixed(2)}</p>
                    <p className="text-sm text-red-400">{coin.change.toFixed(2)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCoins;
