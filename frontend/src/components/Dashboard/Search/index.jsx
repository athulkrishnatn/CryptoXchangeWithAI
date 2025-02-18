import React, { useState } from 'react'
import "./styles.css"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Search = ( {search,onSearchChange} ) => {
    


  return (
    <div className='search-flex flex justify-start items-center gap-6 p-3 bg-gray-800 w-[80%] mx-auto m-4  rounded-4xl'>
        <SearchRoundedIcon/>
        <input
        placeholder='Search'
        className='input  bg-gray-800 w-[100%] font-Inter text-[15px] text-gray-400 border-none focus:outline-none'
        value={search}
        onChange={onSearchChange}
        
        />
        
      
    </div>
  )
}

export default Search
