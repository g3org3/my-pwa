import { useRef, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { useNavigate } from '@reach/router';
import { toast } from 'react-hot-toast';
import { RecaptchaVerifier } from 'firebase/auth';

import { auth } from 'config/firebase';
import { useAuth } from 'config/AuthProvider';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const refs = { email: useRef(), password: useRef() };

  if (currentUser) navigate('/activities');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    if (!refs.email.current || !refs.password.current) return;

    setIsLoading(true);

    try {
      await login(refs.email.current.value, refs.email.current.value);
      refs.email.current.value = '';
      refs.password.current.value = '';
      toast.success('Success');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', padding: '0 24px' }}
    >
      <h1>Login</h1>
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <TextField
          disabled={isLoading}
          name="email"
          placeholder="email"
          inputRef={refs.email}
        />
        <TextField
          disabled={isLoading}
          placeholder="password"
          type="password"
          name="password"
          inputRef={refs.password}
        />
        <LoadingButton loading={isLoading} type="submit" variant="contained">
          Login
        </LoadingButton>
      </form>
    </div>
  );
};

export default Login;
