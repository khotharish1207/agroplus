import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// material-ui
import { Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import FormField from 'components/FormField';
import Alert from 'components/Alerts';
import LedgerType from 'components/LedgerTypeSelect';

import { addPlot, editPlot, fetchPlot, removePlot } from 'store/reducers/actions';

export const Plot = () => {
    const [alertProps, setAlert] = React.useState({ show: false });
    const [show, setShow] = React.useState(false);
    const plots = useSelector((state) => state.plot);
    const dispatch = useDispatch();
    const { state } = useLocation();

    console.log('...state....', state);

    React.useEffect(() => dispatch(fetchPlot()), []);
    const toggleShow = () => setShow(!show);

    const onSubmit = (values) => {
        dispatch(
            addPlot({
                plot: values,
                onSuccess: () =>
                    setAlert({
                        show: true,
                        severity: 'success',
                        message: `new plot has been added`
                    }),
                onFail: () =>
                    setAlert({
                        show: true,
                        severity: 'error',
                        message: `Error while adding plot`
                    })
            })
        );
    };

    const onCloseAlert = () => setAlert({ ...alertProps, show: false });
    return (
        <Grid container>
            <Grid xs={12}>
                <MainCard>
                    <Formik
                        initialValues={{ plotName: state?.PlotName }}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            console.log(values);
                            onSubmit(values);
                        }}
                    >
                        {(formik) => {
                            return (
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid item sm={8}>
                                        <Alert {...alertProps} onClose={onCloseAlert} />
                                        <FormField label="Plot Name" field="plotName" {...formik} />
                                        <LedgerType onChange={formik.handleChange}></LedgerType>
                                        <FormField label="Address" field="plotAddress" {...formik} />
                                        <FormField label="Plot Area" field="plotArea" {...formik} />
                                        {/* <FormField label="Plot Narration" field="plotNarration" {...formik} /> */}
                                        <FormField label="Opening Balence" field="plotOpeningBalence" type="number" {...formik} />
                                        <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
                                            Save
                                        </Button>
                                    </Grid>
                                </form>
                            );
                        }}
                    </Formik>

                    <br />
                    <Divider>Plot List</Divider>
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>PlotName</TableCell>
                                    <TableCell align="right">Ledger Type</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Plot Area</TableCell>

                                    <TableCell align="right">Opening Balence</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {plots.map((plot, index) => (
                                    <TableRow
                                        key={`${plot.LedgerName}-${index}`}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {plot.PlotName}
                                        </TableCell>
                                        <TableCell align="right">{plot.LedgerType}</TableCell>
                                        <TableCell align="right">{plot.Address1}</TableCell>
                                        <TableCell align="right">{plot.Area}</TableCell>
                                        <TableCell align="right">{plot.OpeningBalance}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Plot;
