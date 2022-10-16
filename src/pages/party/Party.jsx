import React from 'react';
import { Formik } from 'formik';

// material-ui
import { Grid, Button, TextField, InputLabel } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// project import
import MainCard from 'components/MainCard';
import FormField from 'components/FormField';
import { useFormikContext } from '../../../node_modules/formik/dist/FormikContext';

export const Party = () => {
    return (
        <Grid container>
            <Grid xs={12}>
                <MainCard>
                    <Formik
                        initialValues={{}}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => {
                            return (
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid item sm={8}>
                                        {/* <Grid item xs={12}>
                                            <Stack spacing={1} mb={2}>
                                                <InputLabel htmlFor={'date'}>Date</InputLabel>
                                                <DesktopDatePicker
                                                    id="date"
                                                    label="Date desktop"
                                                    name="date"
                                                    inputFormat="DD/MM/YYYY"
                                                    value={formik.date}
                                                    // renderInput={(params) => <TextField {...params} />}
                                                />
                                                {touched[field] && errors[field] && (
                                                    <FormHelperText error id={`standard-weight-helper-text-${field}`}>
                                                        {errors[field]}
                                                    </FormHelperText>
                                                )}}
                                            </Stack>
                                        </Grid> */}
                                        <FormField label="Recieved from" field="recievedFrom" {...formik} />
                                        <FormField label="Recieved to" field="recievedTo" {...formik} />
                                        <FormField label="Amount" field="ammount" type="number" {...formik} />
                                        <FormField label="Narration" field="narration" type="number" {...formik} />
                                        <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
                                            Save
                                        </Button>
                                    </Grid>
                                </form>
                            );
                        }}
                    </Formik>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Party;
