import React from 'react';
import { createRoot } from 'react-dom/client';
import Typography from '@mui/material/Typography'; // Added import
import Box from '@mui/material/Box'; // Boxコンポーネントを追加

const About: React.FC = () => (
    <Box component="section" sx={{ bgcolor: 'background.paper', pt: { xs: 2, sm: 3, md: 5 }, px: { xs: 2, sm: 8, md: 10 }, pb: { xs: 10, sm: 10, md: 15 }, width: '100%' }}>
        <Typography variant="h4">About Page</Typography>
        <Typography variant="body1">This is an example page using Container and Box.</Typography>
    </Box>
);

export default About;
