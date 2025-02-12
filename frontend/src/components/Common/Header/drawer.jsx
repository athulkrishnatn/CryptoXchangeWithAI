import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useState } from 'react';

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
          <a href="/">
            <p className='hover:text-white'>Home</p>
            </a>
            <a href="/">
            <p className='hover:text-white'>Compare</p>
            </a>
            <a href="/">
            <p className='hover:text-white'>Watchlist</p>
            </a>
            <a href="/">
            <p className='hover:text-white'>Dashboard</p>
            </a>
          </div>
          </Drawer>
 
    </div>
  );
}
