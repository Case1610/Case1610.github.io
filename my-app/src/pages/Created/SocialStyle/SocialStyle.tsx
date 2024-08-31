import { createRoot } from "react-dom/client";
import React from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
} from '@mui/material';

const Body: React.FC = () => (
    <Container fixed>
        <Box component="section" sx={{ bgcolor: 'background.paper', p: 5, width: '90vw', height: '100vh' }}>
            <Typography variant="h4">ソーシャルスタイル診断</Typography>
            <Button variant="contained" size="medium" onClick={() => window.location.href = '/socialstyle/index.html'}>
                <Typography variant="body1">診断する</Typography>
            </Button>
            <Typography variant="body1">This is an example page using Container and Box.</Typography>
        </Box>
    </Container>
);

export default Body;

const root = createRoot(document.getElementById('root')!);

root.render(<Body />);
