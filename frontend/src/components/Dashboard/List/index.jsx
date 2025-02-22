import React from 'react';
import './styles.css';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const List = ({ coin }) => {
  // If `coin` is undefined, return a fallback row to prevent crashes
  if (!coin) {
    return (
      <tr className='list-row h-full'>
        <td colSpan="5" className="text-center text-gray-500 p-4">
          No data available
        </td>
      </tr>
    );
  }

  return (
    <Link to={`/coin/${coin.id}`}>
      <tr className='list-row h-full'>
        {/* Coin Image & Name */}
        <td className='td-image p-4 flex items-center gap-4 h-full'>
          <Tooltip title="Coin Logo">
            {coin.image ? (
              <img src={coin.image} className='coin-logo hidden sm:block' width='35px' height='35px' alt={coin.name || 'Coin'} />
            ) : (
              <span>🚀</span> // Fallback emoji if image is missing
            )}
          </Tooltip>
          <div className='ps-4 flex flex-col justify-center h-full'>
            <Tooltip title="Coin Symbol">
              <p className='font-semibold uppercase text-xs sm:text-sm'>{coin.symbol || 'N/A'}</p>
            </Tooltip>
            <p className='text-gray-400 text-xs sm:text-sm'>{coin.name || 'Unknown'}</p>
          </div>
        </td>
  
        {/* Price Change in 24H */}
        <Tooltip title="Price Change in 24H">
          <td className='chip-flex flex items-center justify-start gap-4 h-full'>
            <div className={`price-chip ${coin.price_change_24h > 0 ? '' : 'chip-red'} w-[90px] sm:w-[115px]`}>
              {coin.price_change_24h !== undefined ? `${coin.price_change_24h.toFixed(2)}%` : 'N/A'}
            </div>
            <div className={`icon-chip ${coin.price_change_24h > 0 ? '' : 'chip-red'} w-[90px] sm:w-[115px]`}>
              {coin.price_change_24h > 0 ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
            </div>
          </td>
        </Tooltip>
  
        {/* Current Price */}
        <Tooltip title="Current Price" placement='bottom-start'>
          <td className='flex items-center h-full'>
            <h3 
              className='coin-price td-right-align font-semibold text-sm sm:text-base'
              style={{ color: coin.price_change_24h > 0 ? 'var(--green)' : 'var(--red)' }}
            >
              {coin.current_price !== undefined ? `$${coin.current_price.toLocaleString()}` : 'N/A'}
            </h3>
          </td>
        </Tooltip>
  
        {/* Total Volume */}
        <Tooltip title="Total Volume" placement='bottom-start'>
          <td className='flex items-center h-full'>
            <p className='total-volume text-xs sm:text-sm text-gray-500'>
              {coin.total_volume !== undefined ? coin.total_volume.toLocaleString() : 'N/A'}
            </p>
          </td>
        </Tooltip>
  
        {/* Market Cap */}
        <Tooltip title="Market Cap" placement='bottom-start'>
          <td className='flex items-center h-full'>
            <p className='total-volume text-xs sm:text-sm text-gray-500'>
              {coin.market_cap !== undefined ? coin.market_cap.toLocaleString() : 'N/A'}
            </p>
          </td>
        </Tooltip>
      </tr>
    </Link>
  );
};

export default List;
