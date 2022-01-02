import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import { formatDate } from 'services/date';
import { getActivities, removeActivity } from 'config/airtable';
import { useAuth } from 'config/AuthProvider';

export default function AlignItemsList() {
  const { currentUser } = useAuth();
  const [activities, setActivities] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    getActivities().then((data) => {
      setActivities(data);
      setInitialLoading(false);
    });
    const id = setInterval(() => {
      getActivities().then((data) => void setActivities(data));
    }, 5000);

    return () => clearInterval(id);
  }, []);

  const onDelete = async (id) => {
    // eslint-disable-next-line
    const a = confirm('are you sure?');
    if (a) {
      await removeActivity(id);
      const data = await getActivities();
      setActivities(data);
    }
  };

  if (initialLoading) {
    return (
      <div style={{ paddingTop: '32px', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
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
              {!currentUser ? null : (
                <IconButton onClick={() => onDelete(id)}>
                  <CancelPresentationIcon color="error" />
                </IconButton>
              )}
            </ListItem>

            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
