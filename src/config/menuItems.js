import EventNoteIcon from '@mui/icons-material/EventNote';
import AppsIcon from '@mui/icons-material/Apps';
import AddIcon from '@mui/icons-material/Add';
import FaceIcon from '@mui/icons-material/Face';
import LoginIcon from '@mui/icons-material/Login';

export const menuItems = [
  { title: 'Home', Icon: AppsIcon, to: '/' },
  { title: 'Activities', Icon: EventNoteIcon, to: '/activities' },
  { title: 'Add', Icon: AddIcon, to: '/add' },
  { title: 'Signup', Icon: FaceIcon, to: '/signup' },
  { title: 'Login', Icon: LoginIcon, to: '/login' },
];
