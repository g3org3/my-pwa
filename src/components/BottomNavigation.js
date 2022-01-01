import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from '@reach/router';

import { menuItems } from 'components/menuItems';

const MyBottomNavigation = ({ value }) => {
  return (
    <BottomNavigation
      showLabels
      value={value}
      sx={{ position: 'fixed', bottom: 0, width: '100vw' }}
    >
      {menuItems.map(({ title, Icon, to }) => (
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
