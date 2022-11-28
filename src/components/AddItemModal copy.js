import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, InputLabel, MenuItem, Select } from '@mui/material';
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

class AddItemModal extends React.component {
    state = {};

    handleChange = (key) => (val) => this.setState({ [key]: val });

    render() {
        return (
            <Dialog onClose={handleClose} open={open} fullWidth>
                <DialogTitle id="alert-dialog-title">{'Add Item'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Items
                                    onChange={(val) => {
                                        console.log('onchange---', val);
                                        this.handleChange('item')(val);
                                        // ({
                                        //     unit: val?.unit,
                                        //     ratePerUnit: val?.ratePerUnit
                                        // });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormField label="Quantity" field="quantity" type="number" />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Stack spacing={1} mb={2}>
                                    <InputLabel id="unit-select">Unit</InputLabel>
                                    <UnitSelect value={formik.values.unit} onChange={({ value }) => formik.setFieldValue('unit', value)} />
                                </Stack>
                            </Grid>

                            <Grid item xs={6} md={4}>
                                <FormField
                                    label="Rate per unit"
                                    field="ratePerUnit"
                                    type="number"
                                    // value={getRate(formik.values)}
                                    {...formik}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <FormField
                                    label="total"
                                    field="total"
                                    type="number"
                                    //  value={getTotal(formik.values)}
                                    {...formik}
                                />
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
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}

// const AddItemModal = ({ handleClose, open, onSave }) => {
//     const getTotal = (values) => {
//         const { quantity, ratePerUnit, total } = values;
//         if (quantity && ratePerUnit && !total) {
//             return Number(quantity) * Number(ratePerUnit);
//         }
//         return null;
//     };

//     const getRate = (values) => {
//         const { quantity, total, ratePerUnit } = values;
//         if (quantity && total && !ratePerUnit) {
//             return Number(total) / Number(quantity);
//         }
//         return null;
//     };

//     const handleSubmit = () => {}

//     return (
//         <Dialog onClose={handleClose} open={open} fullWidth>
//             <DialogTitle id="alert-dialog-title">{'Add Item'}</DialogTitle>
//             <DialogContent>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={1}>
//                         <Grid item xs={12}>
//                             <Items
//                                 onChange={(val) => {
//                                     console.log('onchange---', val);
//                                     formik.setValues({
//                                         unit: val?.unit,
//                                         ratePerUnit: val?.ratePerUnit
//                                     });
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={6} md={4}>
//                             <FormField label="Quantity" field="quantity" type="number" {...formik} />
//                         </Grid>
//                         <Grid item xs={6} md={4}>
//                             <Stack spacing={1} mb={2}>
//                                 <InputLabel id="unit-select">Unit</InputLabel>
//                                 <UnitSelect value={formik.values.unit} onChange={({ value }) => formik.setFieldValue('unit', value)} />
//                             </Stack>
//                         </Grid>

//                         <Grid item xs={6} md={4}>
//                             <FormField
//                                 label="Rate per unit"
//                                 field="ratePerUnit"
//                                 type="number"
//                                 // value={getRate(formik.values)}
//                                 {...formik}
//                             />
//                         </Grid>
//                         <Grid item xs={6} md={4}>
//                             <FormField
//                                 label="total"
//                                 field="total"
//                                 type="number"
//                                 //  value={getTotal(formik.values)}
//                                 {...formik}
//                             />
//                         </Grid>
//                     </Grid>
//                     <DialogActions>
//                         <Button onClick={handleClose} color="error">
//                             Cancel
//                         </Button>
//                         <Button
//                             disabled={Object.keys(formik.values).length < 1}
//                             variant="contained"
//                             type="submit"
//                             onClick={() => {
//                                 onSave(formik.values);
//                                 handleClose();
//                             }}
//                         >
//                             Save
//                         </Button>
//                     </DialogActions>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// };

export default AddItemModal;
