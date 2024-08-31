import React from 'react';
import { createRoot } from 'react-dom/client';
import Container from '@mui/material/Container'; // Added import
import Typography from '@mui/material/Typography'; // Added import
import Box from '@mui/material/Box'; // Boxコンポーネントを追加

const Home: React.FC = () => (
    <Container fixed>
        <Box component="section" sx={{ bgcolor: 'background.paper', p: 5, width:'90vw', height:'100vh'}}>
            <Typography variant="h4">Home Page</Typography>
            <Typography variant="body1">This is an example page using Container and Box.</Typography>
        </Box>
    </Container>
    );

export default Home;

const root = createRoot(document.getElementById('root')!);

root.render(<Home />);
