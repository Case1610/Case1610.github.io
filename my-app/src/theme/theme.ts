import { createTheme } from '@mui/material/styles';

const createAppTheme = (mode: 'dark' | 'light') =>
    createTheme({
        palette: {
            primary: {
                light: mode === 'light' ? '#ffa733' : '#bdebb1',
                main: mode === 'light' ? '#ff9100' : '#8CDB78',
                dark: mode === 'light' ? '#b26500' : '#68c358',
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
});

export default createAppTheme;