import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import { Formik, Form } from 'formik';
import React from 'react';

import * as Yup from 'yup';

import FormField from 'components/FormField';
import UnitSelect from './UnitSelect';
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
        if (quantity && ratePerUnit && !total) {
            return Number(quantity) * Number(ratePerUnit);
        }
        return null;
    };

    const onChange = () => {};

    // const getRate = (values) => {
    //     const { quantity, total, ratePerUnit } = values;
    //     if (quantity && total && !ratePerUnit) {
    //         return Number(total) / Number(quantity);
    //     }
    //     return null;
    // };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle id="alert-dialog-title">{'Add Item'}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        item: {}
                    }}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }, ...rest) => {
                        console.log('-----', values);
                        schema.isValid(values).then(console.log);
                    }}
                    validationSchema={schema}
                >
                    {(formik) => {
                        console.log('additemmodal', formik);
                        return (
                            <Form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Items
                                            onChange={(val) => {
                                                console.log('onchange---', val);
                                                formik.setFieldValue('item', val);
                                                // formik.setValues({
                                                //     unit: val?.unit,
                                                //     ratePerUnit: val?.ratePerUnit
                                                // });
                                            }}
                                        />
                                        {Object.keys(formik.values.item).length > 0 && (
                                            <Typography variant="overline" display="block" gutterBottom align="right">
                                                {formik.values.item?.unit} = {formik.values.item?.conversionRate}{' '}
                                                {formik.values.item?.secondaryUnit}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <FormField label="Quantity" field="quantity" type="number" {...formik} />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <Stack spacing={1} mb={2}>
                                            <InputLabel id="unit-select">Unit</InputLabel>
                                            <UnitSelect
                                                value={formik.values.unit}
                                                onChange={({ value }) => formik.setFieldValue('unit', value ?? '')}
                                                only={[formik.values.item?.unit, formik.values.item?.secondaryUnit].filter((x) => x)}
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={6} md={4}>
                                        <FormField
                                            label="Rate per unit"
                                            field="ratePerUnit"
                                            type="number"
                                            // value={getRate(formik.values)}
                                            {...formik}
                                            // handleChange={(e) => {}}
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <FormField label="total" field="total" type="number" {...formik} value={getTotal(formik.values)} />
                                    </Grid>
                                </Grid>
                                <DialogActions>
                                    <Button onClick={handleClose} color="error">
                                        Cancel
                                    </Button>
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
