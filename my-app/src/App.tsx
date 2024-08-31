import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import { ColorModeProvider } from './context/ColorModeContext';
import { Box } from '@mui/material';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes/routes'; // ルーティング設定をインポート

const App: React.FC = () => {
    return (
        <ColorModeProvider>
            <Router>
                <Header />
                <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <AppRoutes />
                    </Box>
                </Box>
                <Footer />
            </Router>
        </ColorModeProvider>
    );
};

export default App;

const root = createRoot(document.getElementById('root')!);

root.render(<App />);