import { Button, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import FormField from 'components/FormField';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount } from 'store/reducers/accounts';
import * as Yup from 'yup';
import AutoComplete from './autoComplete';

const schema = Yup.object().shape({
    address: Yup.string().min(1, 'Too Short!').required('Required'),
    gstNo: Yup.string().min(1, 'Too Short!').required('Required'),
    mobile: Yup.string().min(10).max(11, 'Enter valid mobile number').required('Mobile number is required'),
    name: Yup.string().min(1, 'Too Short!').required('Required'),
    openingBalence: Yup.number().min(1, 'Too Short!').required('Required'),
    under: Yup.string().required('Required')
});

const NewAccount = ({ onClose }) => {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{}}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }, ...rest) => {
                schema.isValid(values).then((isValid) => {
                    if (isValid) {
                        dispatch(addAccount(values));
                        onClose();
                    }
                });
            }}
            validationSchema={schema}
        >
            {(formik) => {
                return (
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <FormField label="Name" field="name" type="string" {...formik} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormField label="Mobile" field="mobile" type="number" {...formik} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormField label="Address" field="address" type="string" {...formik} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormField label="GST Number" field="gstNo" type="string" {...formik} />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1} mb={2}>
                                    <InputLabel id="select-under">Under</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="unit-label"
                                        id="select-under"
                                        label="Under"
                                        name="under"
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="bank">Bank A/C</MenuItem>
                                        <MenuItem value="capital">Capital A/C</MenuItem>
                                        <MenuItem value="cash">Cash in hand</MenuItem>
                                        <MenuItem value="expense">Expense</MenuItem>
                                        <MenuItem value="income">Income</MenuItem>
                                        <MenuItem value="fixedAsset">Fixed Asset</MenuItem>
                                        <MenuItem value="credition">Credition</MenuItem>
                                        <MenuItem value="debtor">Debtor</MenuItem>
                                        <MenuItem value="suspense">Suspense</MenuItem>
                                    </Select>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <FormField label="Opening Balence" field="openingBalence" type="string" {...formik} />
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="text" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained">
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

const AccountSelect = (props) => {
    const accounts = useSelector((state) => state.accounts);

    return <AutoComplete options={accounts} labelField="name" NewTemplate={NewAccount} {...props} />;
};

export { NewAccount };

export default AccountSelect;
