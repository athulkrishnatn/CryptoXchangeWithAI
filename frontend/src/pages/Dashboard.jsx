import React, { useContext, useEffect, useState, useMemo, useRef, useCallback } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import Header from "../components/Common/Header";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import Grid from "@/components/Dashboard/Grid";
import Footer from "@/components/Common/Footer/Footer";
import debounce from "lodash/debounce";
import TrendingCoins from "@/components/Dashboard/TrendingCoins/TrendingCoins";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext);

  const cache = useRef({});
  const cancelToken = useRef(null);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchCoins = useCallback(
    debounce(async (page) => {
      if (cache.current[page]) {
        setCoins(cache.current[page]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      if (cancelToken.current) {
        cancelToken.current.cancel("Operation canceled due to new request.");
      }
      cancelToken.current = axios.CancelToken.source();

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`,
          { cancelToken: cancelToken.current.token }
        );
        cache.current[page] = response.data;
        setCoins(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching coin data:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchCoins(page);
  }, [page, fetchCoins]);

  useEffect(() => {
    if (coins.length > 0) {
      const previousIndex = (page - 1) * 10;
      setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    }
  }, [coins, page]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = useMemo(() => {
    return paginatedCoins.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [paginatedCoins, search]);

  return (
    <>
      <div className="mt-5">
        <Header />
        <TrendingCoins/>
       
        
        <BackToTop />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container mx-auto ">
            
           
            <Search search={search} onSearchChange={onSearchChange} />
           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 ms-6">
              {(search ? filteredCoins : paginatedCoins).map((coin) => (
                <Grid key={coin.id} coin={coin} />
              ))}
            </div>
            {!search && (
              <div className="flex justify-center mt-6">
                <PaginationComponent page={page} handlePageChange={handlePageChange} />
              </div>
            )}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
