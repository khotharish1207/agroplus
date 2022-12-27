import React from 'react';
import { Grid, OutlinedInput, InputLabel, Stack, TextField, FormHelperText } from '@mui/material';

const FormField = ({ label, field, values, errors, touched, multiline = false, type = 'text', ...props }) => {
    console.log(field, touched[field], errors[field]);
    return (
        <Grid item>
            <Stack spacing={1} mb={2}>
                <InputLabel htmlFor={label}>{label}</InputLabel>
                <TextField
                    id={label}
                    // label={label}
                    type={type}
                    value={values[field]}
                    name={field}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    placeholder=""
                    fullWidth
                    multiline={multiline}
                    rows={4}
                    error={Boolean(touched[field] && errors[field])}
                    {...props}
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
