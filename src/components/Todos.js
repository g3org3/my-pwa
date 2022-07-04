import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { dbOnValue } from 'config/firebase';
import List from '@mui/material/List';
import Activity from './Activity';

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

  return (
    <List sx={{ bgcolor: 'background.paper', padding: '0' }}>
      {activities.map((todo) => (
        <Activity todo {...todo}></Activity>
      ))}
    </List>
  );
};

export default Todos;
