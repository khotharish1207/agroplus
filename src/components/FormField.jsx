import React from 'react';
import { Grid, OutlinedInput, InputLabel, Stack } from '@mui/material';

const FormField = ({ label, field, values, errors, touched, type = 'text', ...props }) => {
    return (
        <Grid item xs={12}>
            <Stack spacing={1} mb={2}>
                <InputLabel htmlFor={label}>{label}</InputLabel>
                <OutlinedInput
                    id={label}
                    type={type}
                    value={values[field]}
                    name={field}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    placeholder=""
                    fullWidth
                    error={Boolean(touched[field] && errors[field])}
                />
                {touched[field] && errors[field] && (
                    <FormHelperText error id={`standard-weight-helper-text-${field}`}>
                        {errors[field]}
                    </FormHelperText>
                )}
            </Stack>
        </Grid>
    );
};

export default FormField;
