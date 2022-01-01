import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { onValue, ref, remove } from 'firebase/database';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import IconButton from '@mui/material/IconButton';

import { DateTime } from 'luxon';
import { db } from 'config/firebase';
import { formatDate } from 'services/date';
import { useAuth } from 'config/AuthProvider';

export default function AlignItemsList() {
  const { currentUser } = useAuth();
  const [activities, setActivities] = useState([]);
  const [areDoneVisible, setAreDoneVisible] = useState(false);
  const activitiesDBRef = ref(db, '/activities');

  useEffect(() => {
    onValue(activitiesDBRef, (snapshot) => {
      const data = snapshot.val();
      const activities = Object.keys(data).map((k) => ({ id: k, ...data[k] }));
      setActivities(activities);
    });
    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    // eslint-disable-next-line
    const a = confirm('are you sure?');
    if (a) remove(ref(db, 'activities/' + id));
  };

  return (
    <List sx={{ bgcolor: 'background.paper', padding: '0' }}>
      {
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '12px',
          }}
        >
          <Button
            onClick={() => setAreDoneVisible(!areDoneVisible)}
            color="info"
            variant="outlined"
            sx={{ margin: '0 16px' }}
          >
            {areDoneVisible ? 'Esconder ' : 'Ver '} anteriores
          </Button>
        </div>
      }
      {!areDoneVisible
        ? null
        : activities
            .sort((a, b) => {
              return DateTime.fromISO(a.fecha) - DateTime.fromISO(b.fecha);
            })
            .filter((a) => {
              return (
                DateTime.fromISO(a.fecha) <
                DateTime.fromISO(DateTime.now().toISODate())
              );
            })
            .map(({ id, title, fecha, status, emoji }) => {
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
                          {` — ${status}`}
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
      {areDoneVisible ? (
        <div style={{ background: '#eee', padding: '4px 0 4px 16px' }}>
          Anteriores
        </div>
      ) : null}
      {activities
        .sort((a, b) => {
          return DateTime.fromISO(a.fecha) - DateTime.fromISO(b.fecha);
        })
        .filter((a) => {
          return (
            DateTime.fromISO(a.fecha) >=
            DateTime.fromISO(DateTime.now().toISODate())
          );
        })
        .map(({ id, title, fecha, status, emoji }) => {
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
                      {` — ${status}`}
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
