import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import appsConfig from '../config/appsConfig';
import { useColorMode } from '../context/ColorModeContext';

const Header: React.FC = () => {
    const { toggleColorMode, mode } = useColorMode();

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My Applications
                </Typography>
                {appsConfig.map((app) => (
                    <Button key={app.path} color="inherit" component={Link} to={app.path}>
                        {app.name}
                    </Button>
                ))}
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                    onClick={toggleColorMode}
                    sx={{ marginLeft: 2, borderRadius: '50px' }}
                >
                    {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
