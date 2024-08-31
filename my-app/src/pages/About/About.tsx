import React from 'react';
import { createRoot } from 'react-dom/client';
import Container from '@mui/material/Container'; // Added import
import Typography from '@mui/material/Typography'; // Added import
import Box from '@mui/material/Box'; // Boxコンポーネントを追加

const About: React.FC = () => (
    <Container maxWidth="md">
        <Box sx={{p: 2, borderRadius: 1 }}>
            <Typography variant="h4">About Page</Typography>
            <Typography variant="body1">This is an example page using Container and Box.</Typography>
        </Box>
    </Container>
);

export default About;


const root = createRoot(document.getElementById('root')!);

root.render(<About />);