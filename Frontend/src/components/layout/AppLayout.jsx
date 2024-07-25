// import React from 'react'
// import { Box, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Title from '../shared/Title';

// xs to md
let isBio = false;      // this should be on the chat page
// only xs
let onChat = true;     // this should be on the sidebar page

const AppLayout = () => {
  return (
    <>
    {/* <Box> */}
    <Title />
    <Header />
    <Grid2 container height={"calc(100vh - 3.5rem)"}>        
        <Grid2 xs={onChat?0:12} sm={5} md={4} bgcolor={"green"} sx={{display:{xs:isBio?'none':'block', sm:"block"}}} ><h4>Sidebar</h4> </Grid2>
        <Grid2 xs={onChat?12:0} sm={7} md={isBio?4:8} bgcolor={"red"} sx={{display:{xs: (!isBio && onChat)?"block":"none",sm:(!isBio)?"block":"none" ,md:"block"}, }} ><Outlet /> </Grid2>
        <Grid2 xs={12} sm={7} md={4} bgcolor={"primary.main"} sx={{display:{xs: isBio?"block":"none"}}} ><h4>Bio</h4> </Grid2>
    </Grid2>
      
      
    {/* </Box> */}
    </>
  )
}

export default AppLayout
