import * as React from 'react';
import ActionAreaCard from '../../components/ActionAreaCard';
import { Container, Box } from '@mui/material';

const Created: React.FC = () => {
    return (
        <Container fixed>
            <Box component="section" sx={{ bgcolor: 'background.paper', pt: { xs: 2, sm: 3, md: 5 }, px: { xs: 2, sm: 8, md: 10 }, pb: { xs: 10, sm: 10, md: 15 }, width:'100%' }}>                <h1>Created Page</h1>
                <ActionAreaCard
                    title="Grouper"
                    description="group your members"
                    image=".jpg"
                    path="/grouper"
                />
                <ActionAreaCard
                    title="Social Style"
                    description="answer questions to know your social style"
                    image="about.jpg"
                    path="/socialstyle"
                />
            </Box>
            </Container>
    );
};

export default Created;