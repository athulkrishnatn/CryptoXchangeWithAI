import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { colors, createTheme,  ThemeProvider } from '@mui/material';
import Grid from '../Grid';

import "./styles.css"
import List from '../List';

export default function TabsComponent({coins}) {
  const [value, setValue] = React.useState('grid');

  const style = {
    color: "var(--black)",
    "& .Mui-selected": {
      color: "var(--black) !important",
    },
    fontFamily: "Inter,sans-serif",
    colors:"var(--black)",
    fontWeight: 600,
    textTransform: "capitalize",
  };

  const theme = createTheme({
    palette:{
        primary:{
            main:"#0000",
        },
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
      
          <TabList variant="fullWidth" onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="GRID " value="grid" sx={style} />
            <Tab label="List" value="list" sx={style} />
           
          </TabList>
        
        <TabPanel value="grid">
            <div className='grid-flex'>
                {coins.map((coin,i)=>{
                    return(
                        <Grid key={i} coin={coin} />
                    )
                })}
            </div>
        </TabPanel>

         {/* List component*/}
        <TabPanel value="list">
            <table className='list-table'>
                {coins.map((item, i ) => {
                  return <List  coin={item} key={i} />
                })}
            </table>
        </TabPanel>
       
      </TabContext>
    </ThemeProvider>
  );
}
