// Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => (
    <Box
        component="footer"
        sx={{
            p: 2,
            textAlign: 'center',
            mt: 'auto',
            position: 'auto',
            bottom: 0,
            width: '100%',
            backgroundColor: 'background.paper', // 背景色を設定
            boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)', // 上部に影を追加
        }}
    >
        <Typography variant="body2">© 2024 @case_1610</Typography>
    </Box>
);

export default Footer;