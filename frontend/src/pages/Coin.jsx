import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import axios from 'axios';


const CoinPage = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(id){
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then((response)=>{
                console.log(response)
                setIsLoading(false);
            })
            .catch((error)=>{
                console.log("ERROR>>>",error);
                setIsLoading(false)
            })

        }

    }, [id])


  return (
    <div>
     <Header/>
     {isLoading? <Loader/> : <> Hi - {id}</>}
    </div>
  )
}

export default CoinPage
