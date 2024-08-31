import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ColorModeProvider } from '../context/ColorModeContext';
import { Box } from '@mui/material';
import { createRoot } from 'react-dom/client';
import AppRoutes from '../routes/routes'; // ルーティング設定をインポート
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useColorMode } from '../context/ColorModeContext'; // useColorMode をインポート
import appsConfig from '../config/appsConfig'; // appConfig をインポート

const Layout: React.FC = () => {
    return (
        <ColorModeProvider>
            <Router>
                <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <AppRoutes />
                    </Box>
                    <Footer />
                </Box>
            </Router>
        </ColorModeProvider>
    );
};

export default Layout;

const root = createRoot(document.getElementById('root')!);

root.render(<Layout />);


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
        <>
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
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    {appsConfig.map((item, index) => (
                        <ListItemButton key={index} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

const Footer: React.FC = () => (
    <Box
        component="footer"
        sx={{
            p: 2,
            textAlign: 'center',
            mt: 'auto',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: 'background.paper', // 背景色を設定
            boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)', // 上部に影を追加
        }}
    >
        <Typography variant="body2">© 2024 @case_1610</Typography>
    </Box>
);
