import React from 'react';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link } from '@reach/router';
import EditIcon from '@mui/icons-material/Edit';

import { formatDate } from 'services/date';
import { useAuth } from 'config/AuthProvider';

const Activity = (props) => {
  const { emoji, fecha, id, title, lugar, status, onDelete, done, todo } =
    props;
  const { currentUser } = useAuth();
  const to = todo ? `/edit-todo/${id}` : `/edit/${id}`;

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <span style={{ fontSize: '35px' }}>{emoji || '🗓'}</span>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline', textTransform: 'capitalize' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {formatDate(fecha, done)}
              </Typography>
              {lugar ? ` — ${lugar}` : ''}
              {done ? ` — hecho` : ` — ${status}`}
            </>
          }
        />
        {!currentUser || done ? null : (
          <IconButton component={Link} to={to}>
            <EditIcon color="info" />
          </IconButton>
        )}
        {!currentUser ? null : (
          <IconButton onClick={() => onDelete(id)}>
            <CancelPresentationIcon color="error" />
          </IconButton>
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Activity;
