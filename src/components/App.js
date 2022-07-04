import { useState } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import Box from '@mui/material/Box';
import { Toaster } from 'react-hot-toast';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Navbar from 'components/Navbar';
import BottomNavigation from 'components/BottomNavigation';
import Menu from 'components/Menu';
import { useAuth } from 'config/AuthProvider';

const App = ({ children }) => {
  const { initialLoading, currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuClick = () => void setIsMenuOpen(!isMenuOpen);
  const onBottomNavigationClick = (newValue) => {
    navigate(`/${newValue}`);
  };
  const selectedTab = location.pathname;

  const isInstalled = window.navigator.standalone === true || true;
  const navbarProps = isInstalled ? {} : { onMenuClick };

  const onClickAdd = () => {
    if (currentUser) {
      navigate(
        window.location.pathname === '/activities' ? '/add' : '/add-todo'
      );
    } else navigate('/login');
  };

  const color =
    window.location.pathname === '/activities' ? 'primary' : 'purple';

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
        }}
      >
        <Navbar title="Activities" {...navbarProps} />
        <Box
          sx={{
            overflow: 'auto',
            paddingBottom: '30px',
            flex: '1',
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
        {window.location.pathname !== '/activities' &&
        window.location.pathname !== '/todos' ? null : (
          <Fab
            color={color}
            aria-label="add"
            onClick={onClickAdd}
            sx={{ position: 'fixed', bottom: '60px', right: '20px' }}
          >
            <AddIcon />
          </Fab>
        )}
      </div>
    </>
  );
};

export default App;
