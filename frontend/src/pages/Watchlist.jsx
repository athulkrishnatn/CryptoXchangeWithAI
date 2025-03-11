import React, { useEffect, useState, useContext } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";
import Footer from "@/components/Common/Footer/Footer";
import { WatchlistContext } from "../context/WatchlistContext"; 
import QueryStatsIcon from '@mui/icons-material/QueryStats';


function Watchlist() {
  const { watchlist } = useContext(WatchlistContext); 
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (watchlist.length === 0) {
        setLoading(false); 
        return;
      }
      
      try {
        setLoading(true);
        const allCoins = await get100Coins();
        setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [watchlist]); //  context updates

  return (
    <div className="mt-10 py-[50px] pb-[200px]">
      <Header />

      <h1 className='text-xl text-center justify-center font-light ms-6'>Track Your Favorite Cryptocurrencies in One Place <QueryStatsIcon className="text-blue-400   my-3"/> </h1>

      {loading ? ( 
        <h1 style={{ textAlign: "center" }}>Loading Watchlist...</h1>
      ) : watchlist.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>Sorry, No Items In The Watchlist.</h1>
          <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Watchlist;
