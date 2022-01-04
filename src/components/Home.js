import { LoadingButton } from '@mui/lab';
import { List, ListItem } from '@mui/material';
import { useNavigate } from '@reach/router';
import { DateTime } from 'luxon';

import { useAuth } from 'config/AuthProvider';

const Home = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) navigate('/login');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div
      style={{ padding: '0 24px', display: 'flex', flexDirection: 'column' }}
    >
      <h1>Home</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      {!currentUser || true ? null : (
        <List>
          <ListItem>uid: {currentUser.uid}</ListItem>
          <ListItem>email: {currentUser.email}</ListItem>
          <ListItem>emailVerified: {`${currentUser.emailVerified}`}</ListItem>
          <ListItem>isAnonymous: {`${currentUser.isAnonymous}`}</ListItem>
          <ListItem>
            provider: {currentUser.providerData[0].providerId}
          </ListItem>
          <ListItem>provider.uid: {currentUser.providerData[0].uid}</ListItem>
          <ListItem>
            provider.displayName: {currentUser.providerData[0].displayName}
          </ListItem>
          <ListItem>
            provider.phoneNumber: {currentUser.providerData[0].phoneNumber}
          </ListItem>
          <ListItem>
            provider.photoURL: {currentUser.providerData[0].photoURL}
          </ListItem>
          <ListItem>
            session expires:{' '}
            {DateTime.fromMillis(currentUser.stsTokenManager.expirationTime)
              .toLocal()
              .toRelative()}
          </ListItem>
        </List>
      )}
      <LoadingButton onClick={handleLogout} variant="contained">
        Logout
      </LoadingButton>
    </div>
  );
};
export default Home;
