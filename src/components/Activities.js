import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { onValue, ref, remove } from 'firebase/database';

import { formatDate } from 'services/date';
import { db } from 'config/firebase';
import { DateTime } from 'luxon';

export default function AlignItemsList() {
  const [activities, setActivities] = useState([]);
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
    <List sx={{ width: '95%', bgcolor: 'background.paper' }}>
      {activities
        .sort((a, b) => {
          return DateTime.fromISO(a.fecha) - DateTime.fromISO(b.fecha);
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
                      <span
                        onClick={() => onDelete(id)}
                        style={{ marginLeft: '10px' }}
                      >
                        del
                      </span>
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
