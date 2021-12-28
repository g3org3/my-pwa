import { ThemeProvider } from '@mui/material';
import { Router } from '@reach/router';

import App from 'components/App';
import Map from 'components/Map';
import { theme } from '../theme';

const MainContent = () => 'no content';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <App path="/">
          <Map path="recents" />
          <MainContent default />
        </App>
      </Router>
    </ThemeProvider>
  );
};

export default Root;
