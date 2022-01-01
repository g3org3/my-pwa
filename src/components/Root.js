import { ThemeProvider } from '@mui/material';
import { Router } from '@reach/router';

import App from 'components/App';
import Activities from 'components/Activities';
import Add from 'components/Add';
import Signup from 'components/Auth/Signup';
import Login from 'components/Auth/Login';
import Home from 'components/Home';
import { theme } from 'config/theme';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <App path="/">
          <Add path="add" />
          <Activities path="activities" />
          <Signup path="signup" />
          <Login path="login" />
          <Home default />
        </App>
      </Router>
    </ThemeProvider>
  );
};

export default Root;
