let cachedData = null;
let lastFetchTime = 0;

export const get100Coins = async () => {
  const now = Date.now();
  const cacheDuration = 60000; // 60 seconds

  if (cachedData && now - lastFetchTime < cacheDuration) {
    console.log("Returning cached data");
    return cachedData;
  }

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await response.json();

    cachedData = data; // Store in cache
    lastFetchTime = now;

    return data;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return [];
  }
};
