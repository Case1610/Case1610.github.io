// Footer.tsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Footer: React.FC = () => (
    <Box component="footer"
        sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            justifyContent: 'space-between', // Change to 'space-between' for equal width
            position: 'fixed',
            bottom: 0,
            boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)', // Add shadow to the top
            zIndex: 900,
            width: '100%',
        }}>
        {/* <Box sx={{display: 'flex', m: 1, width:{xs:'20%', md: '50%', lg:'90%'},backgroundColor: 'background.paper', }}>
            <Button variant="contained" color="primary" size="small" sx={{ m: 1, width: '100%', textAlign: 'center' }}>P</Button>
            <Button variant="outlined" color="primary" size="small" sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'}}}>P</Button>
            <Button variant="text" color="primary" size="small" sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>P</Button>
            <Button variant="contained" color="secondary" size="small" sx={{ m: 1, width: '100%', textAlign: 'center' }}>S</Button>
            <Button variant="outlined" color="secondary" size="small" sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>S</Button>
            <Button variant="text" color="secondary" size="small" sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>S</Button>
            <Button variant="contained" color="error" size="small" sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>E</Button>
            <Button variant="outlined" color="error" size="small" sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>E</Button>
            <Button variant="text" color="error" size="small" sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>E</Button>
            <Button variant="contained" color="error" size="small" disabled sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>D</Button>
            <Button variant="outlined" color="error" size="small" disabled sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>D</Button>
            <Button variant="text" color="error" size="small" disabled sx={{ m: 1, width: '100%', textAlign: 'center', display:{xs:'none',sm:'block'} }}>D</Button>
        </Box> */}
        <Box
            sx={{
                m: 1,p:1,
                width:{xs:'50%', md: '15%', lg:'15%'},
                textAlign: 'center'
            }}
        >
            <Typography  variant="body2" sx={{m:1,textAlign: 'center'}}>© 2024 @case_1610</Typography>
        </Box>
    </Box>
);

export default Footer;