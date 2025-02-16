import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AnchorTemporaryDrawer() {
  
  const [open, setOpen] = useState(false)
 


 

  return (
    <div>
     
          <IconButton className="hidden max-[800px]:block" onClick={()=> setOpen(true)}><MenuIcon  sx={{ color: "white" }}/></IconButton>
          <Drawer

            anchor={"right"}
            open={open}
            onClose={()=> setOpen(false)}
          >
          <div className='p-5 ms-4 font-medium  h-[100vh] w-[40vh] '>
            <Link to="/">
            <p className='hover:text-white'>Home</p>
            </Link>
            <Link to="/compare">
            <p className='hover:text-white'>Compare</p>
            </Link>
            <Link to="/watchlist">
            <p className='hover:text-white'>Watchlist</p>
            </Link>
            <Link to="/dashboard">
            <p className='hover:text-white'>Dashboard</p>
            </Link>
          </div>
          </Drawer>
 
    </div>
  );
}
