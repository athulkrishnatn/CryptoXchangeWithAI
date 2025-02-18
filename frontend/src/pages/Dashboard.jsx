import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import axios from "axios";
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]); 
  const [isLoading, setIsLoading] = useState(true)

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(response => {
        setCoins(response.data);
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false)
      });
  }, []);

  useEffect(() => {
    const previousIndex = (page - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  }, [coins, page]);

  const filteredCoins = paginatedCoins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
     <Header />
     <BackToTop/>
      { isLoading ? (
        <Loader/>
      ) :
       <div>
       
        <Search search={search} onSearchChange={onSearchChange} />
        <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
        {!search && (
                <PaginationComponent page={page} handlePageChange={handlePageChange} />
        )}
      </div>}
    </>
  );
};

export default Dashboard;
