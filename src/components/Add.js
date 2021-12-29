import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ref, push, child } from 'firebase/database';
import { useNavigate } from '@reach/router';

import { db } from 'config/firebase';

const Add = () => {
  const navigate = useNavigate();
  const refs = {
    title: useRef(),
    fecha: useRef(),
    status: useRef(),
    emoji: useRef(),
  };

  const onSubmit = () => {
    const event = {};
    Object.keys(refs).forEach((key) => {
      if (!refs[key].current) return;
      const value = refs[key].current.value;
      event[key] = value;
    });
    push(child(ref(db), 'activities'), event);
    Object.keys(refs).forEach((key) => {
      if (!refs[key].current) return;
      refs[key].current.value = '';
    });
    navigate('/activities');
  };

  return (
    <div
      style={{
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <TextField placeholder="title" inputRef={refs.title} />
      <TextField placeholder="fecha" inputRef={refs.fecha} />
      <TextField placeholder="status" inputRef={refs.status} />
      <TextField placeholder="emoji" inputRef={refs.emoji} />
      <Button onClick={onSubmit} variant="outlined">
        Create Event
      </Button>
    </div>
  );
};

export default Add;
