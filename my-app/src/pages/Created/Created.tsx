import * as React from 'react';
import ActionAreaCard from '../../components/ActionAreaCard';
import { Container, Box } from '@mui/material';

const Created: React.FC = () => {
    return (
        <Container fixed>
            <Box component="section" sx={{ bgcolor: 'background.paper', p: 5, width: '90vw', height: '100vh' }}>
                <h1>Created Page</h1>
                <ActionAreaCard
                    title="Home Page"
                    description="Go to the Home page"
                    image="home.jpg"
                    path="/"
                />
                <ActionAreaCard
                    title="About Page"
                    description="Go to the About page"
                    image="about.jpg"
                    path="/about"
                />
            </Box></Container>
    );
};

export default Created;