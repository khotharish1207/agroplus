import React from 'react';
import { Formik } from 'formik';

// material-ui
import { Grid, Button } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import FormField from 'components/FormField';

export const Plot = () => {
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
                                        <FormField label="Plot Name" field="plotName" {...formik} />
                                        <FormField label="Plot Area" field="plotArea" {...formik} />
                                        <FormField label="Plot Narration" field="plotNarration" {...formik} />
                                        <FormField label="Opening Balence" field="plotOpeningBalence" type="number" {...formik} />
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

export default Plot;
