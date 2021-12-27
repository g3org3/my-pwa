import React from "react";
import "./App.css";
import Box from '@mui/material/Box';
import Navbar from "./Navbar";
import BottomNavigation from './BottomNavigation';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Navbar title="PWA" />
      <Box sx={{flex: 1, display:'flex', background: '#eee', alignItems: 'center', 'justifyContent': 'center'}}>
        no content
      </Box>
      <BottomNavigation />
    </div>
  );
}

export default App;
