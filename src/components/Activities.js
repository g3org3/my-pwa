import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import { onValue, ref } from 'firebase/database';

import { formatDate } from 'services/date';
import { db } from 'config/firebase';

export default function AlignItemsList() {
  const [activities, setActivities] = useState([]);
  const activitiesDBRef = ref(db, '/activities');
  useEffect(() => {
    onValue(activitiesDBRef, (snapshot) => {
      const data = snapshot.val();
      setActivities(Object.keys(data).map((k) => ({ id: k, ...data[k] })));
    });
  });

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {activities.map(({ title, fecha, status, emoji }) => {
        return (
          <React.Fragment key={title}>
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
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
