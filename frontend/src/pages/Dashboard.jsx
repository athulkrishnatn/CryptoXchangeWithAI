import React, { useContext, useEffect, useState, useMemo } from "react";
import { WatchlistContext } from "../context/WatchlistContext"; 
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext); 

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, [page]);

  useEffect(() => {
    if (coins.length > 0) {
      const previousIndex = (page - 1) * 10;
      setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    }
  }, [coins, page]);

  const filteredCoins = useMemo(() => {
    return paginatedCoins.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [paginatedCoins, search]);

  return (
    <>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent 
            coins={search ? filteredCoins : paginatedCoins} 
            toggleWatchlist={toggleWatchlist} 
            watchlist={watchlist} 
          />
          {!search && (
            <PaginationComponent page={page} handlePageChange={handlePageChange} />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
