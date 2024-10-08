import { createTheme } from '@mui/material/styles';

const createAppTheme = (mode: 'dark' | 'light') =>
    createTheme({
        palette: {
            primary: {
                light: mode === 'light' ? '#ffa733' : '#487e4c',
                main: mode === 'light' ? '#ff9100' : '#1b5e20',
                dark: mode === 'light' ? '#b26500' : '#124116',
                contrastText: mode === 'light' ? '#ffffff' : '#000000',
            },
            secondary: {
                light: mode === 'light' ? '#ffee33' : '#9b9245',
                main: mode === 'light' ? '#ffea00' : '#827717',
                dark: mode === 'light' ? '#b2a300' : '#5b5310',
                contrastText: mode === 'light' ? '#000000' : '#ffffff',
            },
            mode: mode,
            text: {
                primary: mode === 'light' ? '#000000' : '#ffffff',
                secondary: mode === 'light' ? '#555555' : '#aaaaaa',
            },
            background: {
                default: mode === 'light' ? '#ffffff' : '#121212',
                paper: mode === 'light' ? '#f5f5f5' : '#1d1d1d',
            },
        },
        typography: {
            fontFamily: 'Roboto, Arial, sans-serif',
            h1: {
                fontSize: '2.5rem',
                fontWeight: 700,
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 600,
            },
            h3: {
                fontSize: '1.75rem',
                fontWeight: 500,
            },
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
            },
            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
            },
            // 他の要素も同様に設定可能
        },
    });

export default createAppTheme;
