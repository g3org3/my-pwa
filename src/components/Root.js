import { ThemeProvider } from '@mui/material';
import { Router } from '@reach/router';

import { AuthProvider } from 'config/AuthProvider';
import App from 'components/App';
import Activities from 'components/Activities';
import Add from 'components/Add';
import Edit from 'components/Edit';
import Signup from 'components/Auth/Signup';
import Suggestions from 'components/Suggestions';
import Login from 'components/Auth/Login';
import Home from 'components/Home';
import { theme } from 'config/theme';

const Root = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <App path="/">
            <Add path="add" />
            <Edit path="edit/:id" />
            <Activities path="activities" />
            <Suggestions path="suggestions" />
            <Signup path="signup" />
            <Login path="login" />
            <Home default />
          </App>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Root;
