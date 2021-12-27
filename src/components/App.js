import { useState } from 'react';
import Box from '@mui/material/Box';

import Navbar from 'components/Navbar';
import BottomNavigation from 'components/BottomNavigation';
import Menu from 'components/Menu';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box',
        paddingBottom: '24px',
      }}
    >
      <Navbar title="PWA" onMenuClick={() => setIsMenuOpen(!isMenuOpen)} />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          background: '#eee',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        no content
      </Box>
      <BottomNavigation />
    </div>
  );
};

export default App;