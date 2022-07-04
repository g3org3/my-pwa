import { useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from '@reach/router';

import { dbSet, dbOnValue } from 'config/firebase';
import { useAuth } from 'config/AuthProvider';

const EditTodo = ({ id }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const refs = {
    title: useRef(),
    fecha: useRef(),
    status: useRef(),
    emoji: useRef(),
  };

  useEffect(() => {
    dbOnValue(
      '/todos/' + id,
      (snapshot) => {
        const data = snapshot.val();
        Object.keys(refs).forEach((key) => {
          if (!refs[key].current) return;
          refs[key].current.value = data[key];
        });
      },
      { onlyOnce: true }
    );
    // eslint-disable-next-line
  }, []);

  if (!currentUser) navigate('/login');

  const onSubmit = () => {
    const event = {};
    Object.keys(refs).forEach((key) => {
      if (!refs[key].current) return;
      const value = refs[key].current.value;
      event[key] = value;
    });
    dbSet('todos', id, event);
    Object.keys(refs).forEach((key) => {
      if (!refs[key].current) return;
      refs[key].current.value = '';
    });
    navigate('/todos');
  };

  return (
    <div
      style={{
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h1 style={{ fontWeight: 'normal' }}>Edit todo</h1>
      <TextField placeholder="title" inputRef={refs.title} />
      <TextField type="datetime-local" inputRef={refs.fecha} />
      <TextField placeholder="status" inputRef={refs.status} />
      <TextField placeholder="emoji" inputRef={refs.emoji} />
      <Button onClick={onSubmit} variant="contained">
        Update
      </Button>
    </div>
  );
};

export default EditTodo;
