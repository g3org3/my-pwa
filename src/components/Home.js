import { LoadingButton } from '@mui/lab';
import { useAuth } from 'config/AuthProvider';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: '0 24px' }}>
      <h1>Home</h1>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <LoadingButton variant="outlined">Logout</LoadingButton>
    </div>
  );
};
export default Home;
