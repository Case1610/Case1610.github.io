import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ColorModeProvider } from '../context/ColorModeContext';

function About(): React.ReactElement {
    return (
        <ColorModeProvider>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', position: 'relative', pb: '50px' }}>
                <Header />
                <Container fixed>
                    <h1>About Page</h1>
                </Container>
                <Footer />
            </Box>
        </ColorModeProvider>
    );
}

ReactDOM.render(<About />, document.getElementById('root'));