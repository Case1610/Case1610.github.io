import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box,
    Divider,
    Chip
} from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorMode } from '../context/ColorModeContext'; // useColorMode をインポート
import appsConfig from '../config/appsConfig'; // appConfig をインポート

const Header: React.FC = () => {
    const { toggleColorMode, mode } = useColorMode();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box component="header" position="fixed" top={0} width="100%" zIndex={1000} boxShadow='0 2px 4px rgba(0,0,0,0.1)' sx={{ overflow: 'auto' }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Case . WEB
                    </Typography>
                    {/* <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {window.location.pathname === '' ? 'Home' : appsConfig.find((item) => item.path === window.location.pathname)?.name}
                    </Typography> */}
                    <IconButton color="inherit" onClick={toggleColorMode}>
                        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ zIndex: 0 }}>
                <Toolbar />
                <List>
                    <Divider>
                        <Chip label="page" size="small" />
                    </Divider>
                    {appsConfig.map((item, index) => (
                        <ListItemButton key={index} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default Header;