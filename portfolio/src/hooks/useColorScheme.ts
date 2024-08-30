import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useColorScheme() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState<'system' | 'light' | 'dark'>('system');

    useEffect(() => {
        const savedMode = localStorage.getItem('colorMode') as 'system' | 'light' | 'dark';
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('colorMode', mode);
    }, [mode]);

    const themeMode = mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode;

    return { mode, setMode, themeMode };
}
