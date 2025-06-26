import React from 'react';
import { createRoot } from 'react-dom/client';
import Container from '@mui/material/Container'; // Added import
import Typography from '@mui/material/Typography'; // Added import
import Box from '@mui/material/Box'; // Boxコンポーネントを追加

const Home: React.FC = () => (
    <Container fixed>
    <Box component="section"
        sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '64px',
            paddingBottom: '64px',
            flexGrow: 1
        }}>
            <Typography variant="h4">Home Page</Typography>
            <Typography variant="body1">This is an example page using Container and Box.</Typography>
        </Box>
    </Container>
    );

export default Home;

const root = createRoot(document.getElementById('root')!);
root.render(<Home />);
