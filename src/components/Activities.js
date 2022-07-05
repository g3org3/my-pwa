import { DateTime } from 'luxon';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import React, { useState } from 'react';

import { dbRemove } from 'config/firebase';
import Activity from 'components/Activity';
import { useApp } from 'components/App';

const sortOldToRecentDate = (a, b) => {
  return DateTime.fromISO(a.fecha) - DateTime.fromISO(b.fecha);
};

export default function Activities() {
  const ctx = useApp();
  const activities = React.useMemo(() => {
    if (!ctx.activities) return [];
    return Object.keys(ctx.activities)
      .map((key) => ({
        ...ctx.activities[key],
        id: key,
      }))
      .sort(sortOldToRecentDate);
    // eslint-disable-next-line
  }, [ctx.activityKeys]);
  const [areDoneVisible, setAreDoneVisible] = useState(false);

  const onDelete = (id) => {
    // eslint-disable-next-line
    if (confirm('are you sure?')) {
      dbRemove('/activities', id);
    }
  };

  if (ctx.initialLoading) {
    return (
      <div style={{ paddingTop: '32px', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  const activitiesOlderThanToday = !areDoneVisible
    ? []
    : activities.filter((a) => {
        return (
          DateTime.fromISO(a.fecha) <
          DateTime.fromISO(DateTime.now().toISODate())
        );
      });

  const activitiesToday = activities.filter((a) => {
    return (
      DateTime.fromISO(a.fecha) >=
        DateTime.fromISO(DateTime.now().toISODate()) &&
      DateTime.fromISO(a.fecha) <
        DateTime.fromISO(DateTime.now().plus({ days: 1 }).toISODate())
    );
  });

  const activitiesTomorrow = activities.filter((a) => {
    return (
      DateTime.fromISO(a.fecha) >=
        DateTime.fromISO(DateTime.now().plus({ days: 1 }).toISODate()) &&
      DateTime.fromISO(a.fecha) <
        DateTime.fromISO(DateTime.now().plus({ days: 2 }).toISODate())
    );
  });

  const activitiesRest = activities.filter((a) => {
    return (
      DateTime.fromISO(a.fecha) >=
      DateTime.fromISO(DateTime.now().plus({ days: 2 }).toISODate())
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
        {activitiesOlderThanToday.map((props) => (
          <Activity onDelete={onDelete} key={props.id} done {...props} />
        ))}
        {areDoneVisible ? (
          <div style={{ background: '#eee', padding: '4px 0 4px 16px' }}>
            Anteriores
          </div>
        ) : null}
        {activitiesToday.length > 0 && (
          <div style={{ background: '#eee', padding: '4px 0 4px 16px' }}>
            Para hoy
          </div>
        )}
        {activitiesToday.map((props) => (
          <Activity onDelete={onDelete} key={props.id} {...props} />
        ))}
        {activitiesTomorrow.length > 0 && (
          <div style={{ background: '#eee', padding: '4px 0 4px 16px' }}>
            Para Manana
          </div>
        )}
        {activitiesTomorrow.map((props) => (
          <Activity onDelete={onDelete} key={props.id} {...props} />
        ))}
        <div style={{ background: '#eee', padding: '4px 0 4px 16px' }}>
          En los proximos dias
        </div>
        {activitiesRest.map((props) => (
          <Activity onDelete={onDelete} key={props.id} {...props} />
        ))}
      </List>
    </>
  );
}
