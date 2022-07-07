import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import toast from 'react-hot-toast';

import Activity from './Activity';
import { dbOnValue, dbRemove } from 'config/firebase';

const Todos = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    dbOnValue('/todos', (snapshot) => {
      const data = snapshot.val();
      setActivities(Object.keys(data).map((k) => ({ id: k, ...data[k] })));
      toast.success('todos updated');
    });
    // eslint-disable-next-line
    }, []);

  const onDelete = (id) => {
    // eslint-disable-next-line
      if (confirm('are you sure?')) {
      dbRemove('/todos', id);
    }
  };

  return (
    <List sx={{ bgcolor: 'background.paper', padding: '0' }}>
      {activities.map((todo) => (
        <Activity key={todo.id} onDelete={onDelete} todo {...todo}></Activity>
      ))}
    </List>
  );
};

export default Todos;
