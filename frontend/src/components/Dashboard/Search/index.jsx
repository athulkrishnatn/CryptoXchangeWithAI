import React, { useState } from 'react'
import "./styles.css"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Search = ( {search,onSearchChange} ) => {
    


  return (
   <>
           <h1 className='text-3xl font-bold ms-6'>Track and search cryptocurrencies with ease.</h1>
           <h1 className='text-lg font-light text-gray-400 my-2 ms-6'>
           Explore real-time data from 100+ cryptocurrencies and stay ahead in the market.
</h1>

      <div className='search-flex flex justify-start items-center gap-6 p-3 bg-gray-800 w-[95%]  m-4 ms-6  rounded-4xl'>
          <SearchRoundedIcon/>
          <input
          placeholder='Search'
          className='input  bg-gray-800 w-[100%] font-Inter text-[15px] text-gray-400 border-none focus:outline-none'
          value={search}
          onChange={onSearchChange}
          
          />
          
        
      </div>
   </>
  )
}

export default Search
