import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import { formatDate } from 'services/date';
import { getActivities } from 'config/airtable';

export default function AlignItemsList() {
  const [activities, setActivities] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      getActivities().then((data) => {
        setActivities(data);
        setInitialLoading(false);
      });
    }, 10000);

    return () => clearInterval(id);
  }, []);

  if (initialLoading) {
    return <CircularProgress />;
  }

  return (
    <List sx={{ bgcolor: 'background.paper', padding: '0' }}>
      {activities.map(({ id, title, fecha, tu_nombre, emoji }) => {
        return (
          <React.Fragment key={id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <span style={{ fontSize: '35px' }}>{emoji || '🗓'}</span>
              </ListItemAvatar>
              <ListItemText
                primary={title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {formatDate(fecha)}
                    </Typography>
                    {` — ${tu_nombre}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
