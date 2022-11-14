import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, InputLabel, MenuItem, Select } from '@mui/material';
import { Formik, Form } from 'formik';
import React from 'react';

import * as Yup from 'yup';

import FormField from 'components/FormField';
import Items from 'components/Items';
import { getConstantValue } from '../../node_modules/typescript/lib/typescript';

const schema = Yup.object().shape({
    itemName: Yup.string().min(1, 'Too Short!').required('Required'),
    quantity: Yup.number().required().positive().integer().required('Required'),
    unit: Yup.string().required('Required'),
    ratePerUnit: Yup.number().required().positive().integer().required('Required')
});

const AddItemModal = ({ handleClose, open, onSave }) => {
    const getTotal = (values) => {
        const { quantity, ratePerUnit } = values;
        if (quantity && ratePerUnit) {
            return Number(quantity) * Number(ratePerUnit);
        }
        return null;
    };
    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{}}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }, ...rest) => {
                        console.log('-----', values);
                        schema.isValid(values).then(console.log);
                    }}
                    validationSchema={schema}
                >
                    {(formik) => {
                        // console.log('12345', formik);
                        // console.log('formik values', formik.values);
                        return (
                            <Form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Items
                                            onChange={(val) => {
                                                console.log('onchange---', val);
                                                formik.setValues({
                                                    unit: val?.unit,
                                                    ratePerUnit: val?.ratePerUnit
                                                });
                                            }}
                                        />
                                        {/* <FormField label="Item Name" field="itemName" {...formik} /> */}
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <FormField label="Quantity" field="quantity" type="number" {...formik} />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <Stack spacing={1} mb={2}>
                                            <InputLabel id="unit-select">Unit</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="unit-label"
                                                id="unit-select"
                                                label="Unit"
                                                name="unit"
                                                value={formik.values.unit}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value="kg">Kg</MenuItem>
                                            </Select>
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6} md={4}>
                                        <FormField label="Rate per unit" field="ratePerUnit" type="number" {...formik} />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <FormField
                                            label="total"
                                            field="total"
                                            type="number"
                                            disabled
                                            value={getTotal(formik.values)}
                                            {...formik}
                                        />
                                    </Grid>
                                </Grid>
                                <DialogActions>
                                    <Button onClick={handleClose} color="error">
                                        Cancel
                                    </Button>
                                    {/* <Button onClick={handleClose}>Save and New</Button> */}
                                    <Button
                                        disabled={Object.keys(formik.values).length < 1}
                                        variant="contained"
                                        type="submit"
                                        onClick={() => {
                                            onSave(formik.values);
                                            handleClose();
                                        }}
                                    >
                                        Save
                                    </Button>
                                </DialogActions>
                            </Form>
                        );
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default AddItemModal;
