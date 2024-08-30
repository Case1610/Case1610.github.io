import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                bgcolor: 'background.default',
                p: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © 2024 @case_1610
            </Typography>
        </Box>
    );
};

export default Footer;
