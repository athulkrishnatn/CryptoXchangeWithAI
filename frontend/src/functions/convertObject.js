export const coinObject = (setState, data) => {
    if (!data) {
        console.error("coinObject: Data is undefined or null");
        return;
    }

    setState({
        id: data.id || "N/A",
        name: data.name || "N/A",
        symbol: data.symbol || "N/A",
        image: data.image?.large || "",
        desc: data.description?.en || "No description available",
        price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
        total_volume: data.market_data?.total_volume?.usd || 0,
        current_price: data.market_data?.current_price?.usd || 0,
        market_cap: data.market_data?.market_cap?.usd || 0,
    });
};
