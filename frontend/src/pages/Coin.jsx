import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import { coinObject } from '../functions/convertObject';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/lineChart';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';



const Coin = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState(null); 
    const [days, setDays] = useState(60);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    async function getData() {
        const data = await getCoinData(id);
        if (data) {
            coinObject(setCoinData, data);
            const prices = await getCoinPrices(id, days);
            if (prices.length > 0) {
                settingChartData(setChartData, prices)
                
               setIsLoading(false)

                
            }
        }

        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(response => {
                coinObject(setCoinData, response.data); 
                setIsLoading(false); 
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true); 
        setDays(event.target.value);
    
        
    
        const prices = await getCoinPrices(id, event.target.value); 
    
        if (prices.length > 0) {
            console.log("woohoo");
            settingChartData(setChartData, prices)
            setIsLoading(false)
    
            
        } else {
            console.log("No price data available");
        }
    
        setIsLoading(false);
    };
    

    return (
        <div className='mt-20'>
            <Header />
            {isLoading ? (
                <Loader />
            ) : coinData ? (
                <>
                    <div className='grey-wrapper '>
                        <List coin={coinData} />
                    </div>
                    <div className='grey-wrapper '>
                    <SelectDays days={days} handleDaysChange={handleDaysChange} />
                        <LineChart chartData={chartData} />
                    </div>

                    <CoinInfo heading={coinData.name} desc={coinData.desc} />
                </>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default Coin;
