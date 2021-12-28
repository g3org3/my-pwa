import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate } from '@reach/router';

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
  const selectedTab = location.pathname.substr(1);

  return (
    <>
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          boxSizing: 'border-box',
          paddingBottom: '24px',
        }}
      >
        <Navbar title="PWA" onMenuClick={onMenuClick} />
        <Toolbar />
        <div
          style={{
            display: 'block',
            flexGrow: 1,
            background: '#f8f8f8',
          }}
        >
          {children}
        </div>
        <BottomNavigation
          value={selectedTab}
          onClick={onBottomNavigationClick}
        />
      </div>
    </>
  );
};

export default App;
