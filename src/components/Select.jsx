import React from 'react';
import { MenuItem, Select } from '@mui/material';

const Selection = ({ options = [], ...rest }) => {
    const getOptions = () => {
        return options.map((item) => {
            if (typeof item === 'string') {
                return <MenuItem value={item}>{item}</MenuItem>;
            } else if (item.label && item.value) {
                return <MenuItem value={item.value}>{item.label}</MenuItem>;
            }
            return <MenuItem value={item.toString()}>{item}</MenuItem>;
        });
    };
    return <Select rest>{getOptions()}</Select>;
};

export default Selection;
