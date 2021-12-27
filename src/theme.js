import { createTheme } from "@mui/material";

export const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#cbc5ea',
    },
    secondary: {
      main: '#0277bd',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.54)',
      hint: 'rgba(255,255,255,0.38)',
    },
  },
  spacing: 18,
  shape: {
    borderRadius: 24,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiTooltip: {
      arrow: true,
    },
  },
};

export const theme = createTheme(themeOptions)