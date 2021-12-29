import { ThemeProvider } from '@mui/material';
import { Router } from '@reach/router';

import App from 'components/App';
import Activities from 'components/Activities';
import { theme } from '../theme';

const MainContent = () => 'Hello!';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <App path="/">
          <Activities path="activities" />
          <MainContent default />
        </App>
      </Router>
    </ThemeProvider>
  );
};

export default Root;
