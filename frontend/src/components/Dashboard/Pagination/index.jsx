import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function PaginationComponent({ page, handlePageChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }} className='py-10'>
      <p className='items-center justify-center px-5 font-extralight' > <ArrowBackRoundedIcon/> Previous</p>
      <Pagination 
        count={10} 
        page={page} 
        onChange={(event, value) => handlePageChange(event, value)}
        sx={{
          "& .MuiPaginationItem-text": {
            color: "#fff !important",
            border: "2px solid var(--grey)",
          },
          "& .MuiPaginationItem-text:hover": {
            backgroundColor: "transparent !important",
          },
          "& .Mui-selected": {
            backgroundColor: "var(--blue)",
            borderColor: "var(--blue)",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
      />
      <p className='items-center justify-center px-5 font-extralight' >Next <ArrowForwardRoundedIcon/></p>
    </div>
  );
}
