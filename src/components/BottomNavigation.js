import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from '@reach/router';
import { useAuth } from 'config/AuthProvider';

import { authenticatedMenuItems, menuItems } from 'config/menuItems';

const MyBottomNavigation = ({ value }) => {
  const { currentUser } = useAuth();
  const items = currentUser ? authenticatedMenuItems : menuItems;

  return (
    <BottomNavigation showLabels value={value} sx={{ marginBottom: '56px' }}>
      {items.map(({ title, Icon, to }) => (
        <BottomNavigationAction
          component={Link}
          to={to}
          key={to}
          label={title}
          value={to}
          icon={<Icon />}
        />
      ))}
    </BottomNavigation>
  );
};

export default MyBottomNavigation;
