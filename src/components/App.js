import { useState } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import Box from '@mui/material/Box';
import { Toaster } from 'react-hot-toast';

import Navbar from 'components/Navbar';
import BottomNavigation from 'components/BottomNavigation';
import Menu from 'components/Menu';
import { useAuth } from 'config/AuthProvider';

const App = ({ children }) => {
  const { initialLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuClick = () => void setIsMenuOpen(!isMenuOpen);
  const onBottomNavigationClick = (newValue) => {
    navigate(`/${newValue}`);
  };
  const selectedTab = location.pathname;

  const isInstalled = window.navigator.standalone === true;
  const navbarProps = isInstalled ? {} : { onMenuClick };

  if (initialLoading)
    return (
      <>
        <div
          style={{
            alignItems: 'center',
            background: '#0277bd',
            boxSizing: 'border-box',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '30px',
            height: '100vh',
            justifyContent: 'center',
            width: '100vw',
          }}
        >
          Activities | Loading...
        </div>
      </>
    );

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
        }}
      >
        <Navbar title="Activities" {...navbarProps} />
        <Box
          sx={{
            margin: isInstalled ? '48px 0 56px 0' : '48px 0 0 0',
            overflow: 'auto',
          }}
        >
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
