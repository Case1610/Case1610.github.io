import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

interface ActionAreaCardProps {
    title: string;
    description: string;
    image: string;
    path: string; // ナビゲーション用のパスを追加
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ title, description, image, path }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to={path}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ActionAreaCard;