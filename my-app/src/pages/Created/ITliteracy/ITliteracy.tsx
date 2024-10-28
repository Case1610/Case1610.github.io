import React from 'react';
import { createRoot } from 'react-dom/client';
import Button from '@mui/material/Button'; // Added import
import Container from '@mui/material/Container'; // Added import
import Typography from '@mui/material/Typography'; // Added import
import Box from '@mui/material/Box'; // Boxコンポーネントを追加

const Home: React.FC = () => {
    const [timer, setTimer] = React.useState<number>(0);
    const [isRunning, setIsRunning] = React.useState<boolean>(false);
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        setIsRunning(true);
        timerRef.current = setInterval(() => {
            setTimer(prev => parseFloat((prev + 0.01).toFixed(2)));
        }, 10);
    };

    const stopTimer = () => {
        setIsRunning(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    return (
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
                <Typography variant="h4">Timer: {timer}</Typography>
                {!isRunning ? (
                    <Button onClick={() => { setTimer(0); startTimer(); }}>開始</Button>
                ) : (
                    <>
                        <Box mt={2}>
                            <input type="text" placeholder="テキストを入力してください" />
                        </Box>
                        <Button onClick={stopTimer}>終了</Button>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Home;

const root = createRoot(document.getElementById('root')!);
root.render(<Home />);