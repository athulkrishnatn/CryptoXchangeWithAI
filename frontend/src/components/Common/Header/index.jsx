import React from 'react'
import TemporaryDrawer from './drawer'
import Button from '../Button/index'



const Header = () => {
  return (
    <div className='flex justify-between sticky p-5 ps-7'>
        <h1 className='ms-5 text-2xl text-white font-semibold'>Cryptoxchange <span className='to-blue-300 inline-block'>.</span></h1>
        <div className="links text-gray-500 font-semibold items-center flex justify-end gap-6 pe-5 max-[800px]:hidden  ">
            <a href="/">
            <p className='hover:text-white'>Home</p>
            </a>
            <a href="/">
            <p className='hover:text-white'>Compare</p>
            </a>
            <a href="/">
            <p className='hover:text-white'>Watchlist</p>
            </a>
            <a href="#">
            <Button  text={"Dashboard"} onClick={ ()=> console.log("Btn clicked")}
            />
            </a>
        </div>

        <div className="hidden max-[800px]:block">
          <TemporaryDrawer/>
        </div>
      
    </div>
  )
}

export default Header
