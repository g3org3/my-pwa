import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from '@reach/router';
import Paper from '@mui/material/Paper';

import { useAuth } from 'config/AuthProvider';

const Login = () => {
  const { currentUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (currentUser) navigate('/activities');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        height: '100vh',
        alignItems: 'center',
        background: '#f8f8f8',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '90%',
          maxWidth: '500px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <h1 style={{ padding: 0, margin: 0, fontWeight: 'normal' }}>
          Activities App
        </h1>
        Haz login para poder agregar actividades
        <LoadingButton variant="contained" onClick={() => loginWithGoogle()}>
          Login with google
        </LoadingButton>
      </Paper>
    </div>
  );
};

export default Login;
