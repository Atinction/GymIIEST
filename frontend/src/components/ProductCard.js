import React from 'react';
import { Card, CardMedia, Box, Typography } from '@mui/material';

const ProductCard = ({ title, description, imageUrl, onNext }) => {
    return (
        <Card
            onClick={onNext}
            sx={{
                position: 'relative',
                height: 250,
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.04)'
                }
            }}
        >
            <CardMedia
                component="img"
                image={imageUrl}
                alt={title}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 2,
                    textAlign: 'center',
                    color: '#fff'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        textShadow: '0 0 10px rgba(0,0,0,0.8)'
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        textShadow: '0 0 6px rgba(0,0,0,0.6)'
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Card>
    );
};

export default ProductCard;
