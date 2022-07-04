import { DateTime } from 'luxon';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { dbOnValue, dbRemove } from 'config/firebase';
import Activity from 'components/Activity';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [areDoneVisible, setAreDoneVisible] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    dbOnValue('/activities', (snapshot) => {
      const data = snapshot.val();
      const activities = Object.keys(data).map((k) => ({ id: k, ...data[k] }));
      setActivities(activities);
      setInitialLoading(false);
      toast.success('activities updated');
    });
    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    // eslint-disable-next-line
    const a = confirm('are you sure?');
    if (a) {
      dbRemove('/activities', id);
      toast.success('removed');
    }
  };

  if (initialLoading) {
    return (
      <div style={{ paddingTop: '32px', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  const filteredSortedActivites = !areDoneVisible
    ? []
    : activities
        .sort((a, b) => {
          return DateTime.fromISO(a.fecha) - DateTime.fromISO(b.fecha);
        })
        .filter((a) => {
          return (
            DateTime.fromISO(a.fecha) <
            DateTime.fromISO(DateTime.now().toISODate())
          );
        });

  return (
    <>
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
        {filteredSortedActivites.map((props) => (
          <Activity onDelete={onDelete} key={props.id} done {...props} />
        ))}
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
          .map((props) => (
            <Activity onDelete={onDelete} key={props.id} {...props} />
          ))}
      </List>
    </>
  );
}
