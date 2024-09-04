// Footer.tsx
import React from 'react';
import {
    Box,
    Typography,
    Link,
    Toolbar,
    AppBar,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    Mail as MailIcon,
    Inbox as InboxIcon, // Add this line to import InboxIcon
} from '@mui/icons-material';

const Sidebar: React.FC = () => (
    <Box
        component="div"
        sx={{
            p: 2,
            textAlign: 'left',
            mt: 'auto',
            position: 'auto',
            bottom: 0,
            width: '100%',
            backgroundColor: 'background.paper', // 背景色を設定
            boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)', // 上部に影を追加
            color: 'text.primary', // テキストの色を設定
            zIndex: 0,
        }}
    >
        <Drawer
            variant="permanent"
            anchor='left'
            sx={{
                width: '10%',
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: '10%', boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {['primary', 'secondry', 'BG', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
        <Typography variant="body2"></Typography>
    </Box>
);

export default Sidebar;


