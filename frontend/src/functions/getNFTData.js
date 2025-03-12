let cachedNFTData = null;
let lastFetchTimeNFT = 0;

const NFT_LIST_URL = "https://api.coingecko.com/api/v3/nfts/list";
const CACHE_DURATION = 60000; // Cache for 60 sec (1 min)

export const getNFTData = async () => {
  const now = Date.now();

  if (cachedNFTData && now - lastFetchTimeNFT < CACHE_DURATION) {
    console.log("Returning cached NFT data");
    return cachedNFTData;
  }

  try {
    // Fetch NFT list
    const response = await fetch(NFT_LIST_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Get first 100 NFTs with relevant fields
    const nftDataArray = data.slice(0, 100).map((nft) => ({
      id: nft.id,
      name: nft.name,
      contract_address: nft.contract_address,
      asset_platform_id: nft.asset_platform_id || "N/A",
      symbol: nft.symbol,
    }));

    // Cache the data
    cachedNFTData = nftDataArray;
    lastFetchTimeNFT = now;

    console.log("Fetched NFT Data:", cachedNFTData);
    return cachedNFTData;
  } catch (error) {
    console.error("Error fetching NFT data:", error);
    return [];
  }
};
