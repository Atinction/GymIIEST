import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const CardItem = ({ title, description, imageUrl }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
                borderRadius: '18px',
                overflow: 'hidden',
                position: 'relative',
                height: '300px',
                width: '500px',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                cursor: 'pointer'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(8px)',
                    color: 'white',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 2
                }}
            >
                <div>
                    <h2 style={{ fontSize: '1.7rem', fontWeight: '600' }}>{title}</h2>
                    <p style={{ fontSize: '0.95rem', color: '#e0e0e0' }}>{description}</p>
                </div>
                <div style={{ alignSelf: 'flex-end' }}>
                    <FaArrowRight size={22} color="#00ffc6" />
                </div>
            </div>
        </motion.div>
    );
};

export default CardItem;