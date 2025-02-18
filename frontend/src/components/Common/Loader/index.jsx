import { CircularProgress } from '@mui/material'
import React from 'react'
import "./styles.css"

const Loader = () => {
  return (
    <div className='loader-container flex justify-center items-center w-screen h-screen bg-black '>
       <CircularProgress className=' ' />
    </div>
  )
}

export default Loader
