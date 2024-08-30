import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import AppRoutes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import { ColorModeProvider } from './context/ColorModeContext';

function App(): React.ReactElement {
    return (
        <ColorModeProvider>
            <CssBaseline />
            <Router>
                <Box sx={{ minHeight: '100vh', position: 'relative', pb: '50px' }}>
                    <Header />
                    <Container fixed>
                        <AppRoutes />
                    </Container>
                    <Footer />
                </Box>
            </Router>
        </ColorModeProvider>
    );
}

export default App;
