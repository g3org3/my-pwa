import { LoadingButton } from '@mui/lab';
import { useNavigate } from '@reach/router';

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
      <LoadingButton onClick={handleLogout} variant="contained">
        Logout
      </LoadingButton>
    </div>
  );
};
export default Home;
