import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { ColorModeProvider } from './context/ColorModeContext';
import { Box, Container } from '@mui/material';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes/routes'; // ルーティング設定をインポート

const App: React.FC = () => {
    return (
        <ColorModeProvider>
            <Router>
                <Header />
                <Container fixed>
                    <Box component="main"
                        sx={{
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            paddingTop: '64px',
                            paddingBottom: '64px',
                            flexGrow: 1
                        }}>
                        <AppRoutes />
                    </Box>
                </Container>
                <Footer />
            </Router>
        </ColorModeProvider>
    );
};

export default App;

const root = createRoot(document.getElementById('root')!);

root.render(<App />);