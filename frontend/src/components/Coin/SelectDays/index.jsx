import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SelectDays({ days, handleDaysChange }) {
  return (
    <div className="select-days flex justify-start items-center gap-2 m-2">
      <p className="mt-4 ms-2 mb-2">Price Change in</p>

      <Select
        className="ms-2 mt-4 mb-2"
        value={days}
        onChange={(event) => handleDaysChange(event.target.value)}
        sx={{
          height: "2.5rem",
          color: "var(--white)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
          },
          "& .MuiSvgIcon-root": {
            color: "var(--white)",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#3a80e9",
            },
          },
        }}
      >
        {[7, 30, 60, 90, 120, 365].map((value) => (
          <MenuItem key={value} value={value}>
            {value === 365 ? "1 Year" : `${value} Days`}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
