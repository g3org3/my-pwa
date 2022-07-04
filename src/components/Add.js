import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from '@reach/router';

import { dbPush } from 'config/firebase';
import { useAuth } from 'config/AuthProvider';

const Add = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const refs = {
    title: useRef(),
    fecha: useRef(),
    status: useRef(),
    emoji: useRef(),
    lugar: useRef(),
  };

  if (!currentUser) navigate('/login');

  const onSubmit = () => {
    const event = {};
    Object.keys(refs).forEach((key) => {
      if (!refs[key].current) return;
      const value = refs[key].current.value;
      event[key] = value;
    });
    dbPush('activities', event);
    Object.keys(refs).forEach((key) => {
      if (!refs[key].current) return;
      refs[key].current.value = '';
    });
    navigate('/activities');
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
      <h1 style={{ fontWeight: 'normal' }}>Add new activity</h1>
      <TextField placeholder="title" inputRef={refs.title} />
      <TextField
        placeholder="fecha-hora"
        type="datetime-local"
        inputRef={refs.fecha}
      />
      <TextField placeholder="lugar" inputRef={refs.lugar} />
      <TextField placeholder="status" inputRef={refs.status} />
      <TextField placeholder="emoji" inputRef={refs.emoji} />
      <Button onClick={onSubmit} variant="contained">
        Create
      </Button>
    </div>
  );
};

export default Add;
