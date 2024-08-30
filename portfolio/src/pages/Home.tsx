import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import appsConfig from '../config/appsConfig';  // appsConfigをインポート
import ActionAreaCard from '../components/ActionAreaCard';  // ActionAreaCardをインポート

const Home: React.FC = () => {
    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {appsConfig.map((app) => (
                <Grid item key={app.path} xs={12} sm={6} md={4}>
                    <Link to={app.path} style={{ textDecoration: 'none' }}>
                        <ActionAreaCard
                            title={app.name}  // カードのタイトルにアプリ名を渡す
                            description={app.description}  // カードの説明にアプリの説明を渡す
                            image={app.image}  // カードの画像にアプリの画像を渡す
                        />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Home;
