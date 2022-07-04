import React from 'react';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { formatDate } from 'services/date';
import { useAuth } from 'config/AuthProvider';

const Activity = ({ emoji, fecha, id, title, onDelete }) => {
  const { currentUser } = useAuth();

  return (
    <>
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
              {` — hecho`}
            </React.Fragment>
          }
        />
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
