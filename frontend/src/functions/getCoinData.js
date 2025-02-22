import axios from "axios";

export const getCoinData = (id) =>{
     const myData =  axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then(response => {
        return response.data; // Ensure this function is correctly setting the state
        
    })
    .catch(error => {
        console.log(error);
        
    });
    return myData;
}