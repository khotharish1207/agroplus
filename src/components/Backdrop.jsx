import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material/';

const BackdropLoader = ({ open }) => {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: 9 }} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default BackdropLoader;
