import AddIcon from '@mui/icons-material/Add';
import AppsIcon from '@mui/icons-material/Apps';
import EventNoteIcon from '@mui/icons-material/EventNote';
// import FaceIcon from '@mui/icons-material/Face';
// import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LoginIcon from '@mui/icons-material/Login';

export const authenticatedMenuItems = [
  { title: 'Home', Icon: AppsIcon, to: '/' },
  { title: 'Activities', Icon: EventNoteIcon, to: '/activities' },
  { title: 'Add', Icon: AddIcon, to: '/add' },
  // { title: 'Suggestions', Icon: PendingActionsIcon, to: '/suggestions' },
];

export const menuItems = [
  // { title: 'Signup', Icon: FaceIcon, to: '/signup' },
  { title: 'Activities', Icon: EventNoteIcon, to: '/activities' },
  { title: 'Login', Icon: LoginIcon, to: '/login' },
];
