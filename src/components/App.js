import { useState } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import Box from '@mui/material/Box';
import { Toaster } from 'react-hot-toast';

import Navbar from 'components/Navbar';
import BottomNavigation from 'components/BottomNavigation';
import Menu from 'components/Menu';

const App = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuClick = () => void setIsMenuOpen(!isMenuOpen);
  const onBottomNavigationClick = (newValue) => {
    navigate(`/${newValue}`);
  };
  const selectedTab = location.pathname;

  const isInstalled = true; // window.navigator.standalone === true;
  const navbarProps = isInstalled ? {} : { onMenuClick };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          boxSizing: 'border-box',
          paddingBottom: isInstalled ? '24px' : 0,
        }}
      >
        <Navbar title="Activities" {...navbarProps} />
        <Box sx={{ flex: 1, margin: '48px 0 56px 0', overflow: 'auto' }}>
          {children}
        </Box>
        {isInstalled ? (
          <BottomNavigation
            value={selectedTab}
            onClick={onBottomNavigationClick}
          />
        ) : null}
      </div>
    </>
  );
};

export default App;
