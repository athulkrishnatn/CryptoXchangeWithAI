import React from 'react'
import './styles.css'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';


const List = ({coin}) => {
  return (
    <tr className='list-row'>
        <td className="td-image p-4 gap-4">
        { <img src={coin.image} className='coin-logo' width={'35px'} height={'35px'}  /> }
        </td>

        <td>
        <div className=''>
          <p className='font-semibold uppercase'>{coin.symbol}</p>
          <p className='text-gray-400 text-sm'> {coin.name} </p>
        </div>
      </td>
      {coin.price_change_24h >0 ? (
      <td className='chip-flex flex justify-start gap-4 items-center m-4'>
          <td className="price-chip   ">
            {coin.price_change_24h.toFixed(2)}%
          </td>
          <div className='icon-chip'>
              <TrendingUpRoundedIcon/>
          </div>
      </td>
      
    
        )  :
    <td className='chip-flex flex justify-start gap-4 items-center m-4 '>
          <div className="price-chip chip-red  ">
            {coin.price_change_24h.toFixed(2)}%
          </div>
          <div className='icon-chip chip-red'>
              <TrendingDownRoundedIcon/>
          </div>
      </td>

    }
    <td>
    <h3 className='coin-price font-semibold'
    style={{color:coin.price_change_24h > 0 ? "var(--green)" : "var(--red)"}}
    > ${coin.current_price.toLocaleString()} 
    </h3>
   

    </td>
    <td>
        <p className='total-volume text-sm text-gray-500 pt-3 pb-2'> {coin.total_volume.toLocaleString()} </p>
    </td>
    <td>
    <p className='total-volume text-sm text-gray-500'> {coin.market_cap.toLocaleString()} </p>

    </td>
   

    


    </tr>
  )
}

export default List
