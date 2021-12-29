import { useState } from 'react';
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
  const selectedTab = location.pathname;

  const isInstalled = window.navigator.standalone === true;
  const navbarProps = isInstalled ? {} : { onMenuClick };

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
          paddingBottom: isInstalled ? '24px' : 0,
        }}
      >
        <Navbar title="PWA" {...navbarProps} />
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            background: '#f8f8f8',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
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
