import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import BottomNavigation from './BottomNavigation';

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Navbar />
      <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        content
      </div>
      <BottomNavigation />
    </div>
  );
}

export default App;
