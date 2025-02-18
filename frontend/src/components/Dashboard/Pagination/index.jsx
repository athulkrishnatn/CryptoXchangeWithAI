import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationComponent({ page, handlePageChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Pagination 
        count={10} 
        page={page} 
        onChange={(event, value) => handlePageChange(event, value)}
        sx={{
          "& .MuiPaginationItem-text": {
            color: "#fff !important",
            border: "1px solid var(--grey)",
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
    </div>
  );
}
