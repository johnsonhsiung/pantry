'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff9c27',
      light: '#000000',
      dark: '#986421',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    secondary: {
      main: '#dc1f5f',
    },
    background: {
      default: '#000000',
    },
  },
});

export default theme;
