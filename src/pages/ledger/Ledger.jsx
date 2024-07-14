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

import { addLedger, fetchLedger } from 'store/reducers/actions';

export const Ledger = () => {
    const [alertProps, setAlert] = React.useState({ show: false });
    const ledger = useSelector((state) => state?.ledger || []);
    const dispatch = useDispatch();
    const { state } = useLocation();

    React.useEffect(() => dispatch(fetchLedger()), []);

    const onSubmit = (values) => {
        dispatch(
            addLedger({
                ledger: values,
                onSuccess: () =>
                    setAlert({
                        show: true,
                        severity: 'success',
                        message: `new Ledger has been added`
                    }),
                onFail: () =>
                    setAlert({
                        show: true,
                        severity: 'error',
                        message: `Error while adding crop`
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
                        initialValues={{ ledgerName: state?.newLedger }}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            console.log(values);
                            onSubmit(values);
                        }}
                    >
                        {(formik) => {
                            return (
                                <React.Fragment>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Grid item sm={8}>
                                            <Alert {...alertProps} onClose={onCloseAlert} />
                                            <FormField label="Ledger Name" field="ledgerName" {...formik} />
                                            {/* <FormField label="Ledger type" field="ledgerType" {...formik} /> */}
                                            <LedgerType onChange={formik.handleChange}></LedgerType>
                                            <FormField label="Address" field="ledgerAddress" {...formik} />
                                            <FormField label="Opening Balence" field="ledgerOpeningBalence" type="number" {...formik} />
                                            <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
                                                Save
                                            </Button>
                                        </Grid>
                                    </form>
                                    <br />
                                    <Divider>Ledger List</Divider>
                                    <br />
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>LedgerName</TableCell>
                                                    <TableCell align="right">Ledger Type</TableCell>
                                                    <TableCell align="right">Ledger Gorup Name</TableCell>
                                                    <TableCell align="right">Nature Of Ledgers</TableCell>
                                                    <TableCell align="right">Address1</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {ledger.map((ledgr, index) => (
                                                    <TableRow
                                                        key={`${ledgr.LedgerName}-${index}`}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {ledgr.LedgerName}
                                                        </TableCell>
                                                        <TableCell align="right">{ledgr.LedgerType}</TableCell>
                                                        <TableCell align="right">{ledgr.LedgerGorupName}</TableCell>
                                                        <TableCell align="right">{ledgr.NatureOfLedgers}</TableCell>
                                                        <TableCell align="right">{ledgr.Address1}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </React.Fragment>
                            );
                        }}
                    </Formik>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Ledger;
