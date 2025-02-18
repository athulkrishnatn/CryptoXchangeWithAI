import React from 'react';
import './styles.css';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';

const List = ({ coin }) => {
  return (
    <tr className='list-row h-full'>
      <td className='td-image p-4 flex items-center gap-4 h-full'>
        <Tooltip title="Coin Logo">
          <img src={coin.image} className='coin-logo hidden sm:block' width='35px' height='35px' alt={coin.name} />
        </Tooltip>
        <div className='ps-4 flex flex-col justify-center h-full'>
          <Tooltip title="Coin Name">
            <p className='font-semibold uppercase text-xs sm:text-sm'>{coin.symbol}</p>
          </Tooltip>
          <p className='text-gray-400 text-xs sm:text-sm'>{coin.name}</p>
        </div>
      </td>
      
      <Tooltip title="Price Change in 24H">
        <td className='chip-flex flex items-center justify-start gap-4 h-full'>
          <div className={`price-chip ${coin.price_change_24h > 0 ? '' : 'chip-red'} w-[90px] sm:w-[115px]`}>
            {coin.price_change_24h.toFixed(2)}%
          </div>
          <div className={`icon-chip ${coin.price_change_24h > 0 ? '' : 'chip-red'} w-[90px] sm:w-[115px]`}>
            {coin.price_change_24h > 0 ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
          </div>
        </td>
      </Tooltip>
      
      <Tooltip title="Current Price" placement='bottom-start'>
        <td className='flex items-center h-full'>
          <h3 
            className='coin-price td-right-align font-semibold text-sm sm:text-base'
            style={{ color: coin.price_change_24h > 0 ? 'var(--green)' : 'var(--red)' }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
        </td>
      </Tooltip>
      
      <Tooltip title="Total Volume " placement='bottom-start'>
        <td className='flex items-center h-full'>
          <p className='total-volume text-xs sm:text-sm text-gray-500'>
            {coin.total_volume.toLocaleString()}
          </p>
        </td>
      </Tooltip>
      
      <Tooltip title="Market Cap" placement='bottom-start'>
        <td className='flex items-center h-full'>
          <p className='total-volume text-xs sm:text-sm text-gray-500'>
            {coin.market_cap.toLocaleString()}
          </p>
        </td>
      </Tooltip>
    </tr>
  );
};

export default List;
