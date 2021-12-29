import { ThemeProvider } from '@mui/material';
import { Router } from '@reach/router';

import App from 'components/App';
import Activities from 'components/Activities';
import Add from 'components/Add';
import { theme } from 'config/theme';

const MainContent = () => 'Hello!';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <App path="/">
          <Add path="/add" />
          <Activities path="activities" />
          <MainContent default />
        </App>
      </Router>
    </ThemeProvider>
  );
};

export default Root;
