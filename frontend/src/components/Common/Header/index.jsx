import React from 'react'
import TemporaryDrawer from './drawer'
import Button from '../Button/index'
import { Link } from 'react-router-dom'



const Header = () => {
  return (
    <div className='flex justify-between sticky p-5 ps-7'>
        <h1 className='ms-5 text-2xl text-white font-semibold'>Cryptoxchange <span className='to-blue-300 inline-block'>.</span></h1>
        <div className="links text-gray-500 font-semibold items-center flex justify-end gap-6 pe-5 max-[800px]:hidden  ">
            <Link to="/">
            <p className='hover:text-white'>Home</p>
            </Link>
            <Link to="/compare">
            <p className='hover:text-white'>Compare</p>
            </Link>
            <Link to="/">
            <p className='hover:text-white'>Watchlist</p>
            </Link>
            <Link to="/dashboard">
            <Button  text={"Dashboard"} onClick={ ()=> console.log("Btn clicked")}
            />
            </Link>
        </div>

        <div className="hidden max-[800px]:block">
          <TemporaryDrawer/>
        </div>
      
    </div>
  )
}

export default Header
