import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from '@reach/router';

import { useAuth } from 'config/AuthProvider';

const Login = () => {
  const { login, currentUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (currentUser) navigate('/activities');

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', padding: '0 24px' }}
    >
      <h1>Login</h1>
      <LoadingButton
        onClick={() => loginWithGoogle()}>
        Login with google
      </LoadingButton>
    </div>
  );
};

export default Login;
