import Footer from "@/components/Common/Footer/Footer";
import Header from "@/components/Common/Header";
import Loader from "@/components/Common/Loader";
import PaginationComponent from "@/components/Dashboard/Pagination";
import { getNFTData } from "@/functions/getNFTData";
import React, { useEffect, useState } from "react";

const NFTPage = () => {
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25; // NFTs per page

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        const data = await getNFTData(); // Fetching from cache
        setNftList(data);
      } catch (error) {
        setError("Failed to load NFT data");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(nftList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNFTs = nftList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if(loading){
    return <Loader/>
  }

  return (
    <>
    <Header/>
        <div className="p-10 mt-[50px]">
          <h1 className="text-3xl font-bold text-white  mb-4">
            Stay Ahead in the NFT Market with the Latest Insights
          </h1>
          <p className=" text-gray-400 mb-8">
           The NFT ecosystem is a dynamic and rapidly evolving sector within the digital asset market, characterized by fluctuating valuations, emerging collections, and shifting investor sentiment. This dataset provides a structured overview of the top 100 NFT collections, offering critical insights into their unique identifiers, smart contract addresses, and market symbols.
          </p>
    
          <div className="">
          <p className="text-gray-100 underline underline-offset-4 decoration-1 font-light mb-4">
            Showing <span >{nftList.length}</span> NFTs
          </p>

          <table className="w-full border-[3px] border-gray-400/30  rounded-xl text-center  border-separate">
  <thead className="bg-gray-900 text-white">
    <tr>
      <th className="p-3 font-medium">Rank</th>
      <th className="p-3 font-medium">ID</th>
      <th className="p-3 font-medium">Collection Name</th>
      <th className="p-3 font-medium">Contract Address</th>
      <th className="p-3 font-medium">Asset Platform</th>
      <th className="p-3 font-medium">Symbol</th>
    </tr>
  </thead>
  <tbody>
    {currentNFTs.length > 0 ? (
      currentNFTs.map((nft, index) => (
        <tr
          key={nft.id}
          className="font-light hover:bg-gray-900 transition-all duration-200"
        >
          <td className="p-3">{indexOfFirstItem + index + 1}</td>
          <td className="p-3">{nft.id}</td>
          <td className="p-3">{nft.name}</td>
          <td className="p-3 text-sm text-gray-300">
            {nft.contract_address || "N/A"}
          </td>
          <td className="p-3">{nft.asset_platform_id || "N/A"}</td>
          <td className="p-3">{nft.symbol || "N/A"}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="p-5 text-gray-400">
          No NFTs available.
        </td>
      </tr>
    )}
  </tbody>
</table>
          </div>
    
          {/* Pagination Component */}
          {nftList.length > itemsPerPage && (
            <PaginationComponent page={currentPage} handlePageChange={handlePageChange} />
          )}
        </div>
        <Footer/>
    </>
  );
};

export default NFTPage;
