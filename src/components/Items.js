import {
    Autocomplete,
    Box,
    Button,
    createFilterOptions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import FormField from 'components/FormField';
import UnitSelect from './UnitSelect';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { addItem } from 'store/reducers/items';

const schema = Yup.object().shape({
    itemName: Yup.string().min(1, 'Too Short!').required('Required'),
    unit: Yup.string().required('Required'),
    secondaryUnit: Yup.string().required('Required'),
    conversionRate: Yup.number().required().positive().integer().required('Required')
});

const filter = createFilterOptions();

export const Items = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(null);
    const { items, units } = useSelector(({ items, units }) => ({ items, units }));
    const unitObj = units.reduce((acc, u) => {
        acc[u.value] = u.label;
        return acc;
    }, {});

    const handleClose = () => setOpen(false);
    const onChange = (val) => {
        setValue(val);
        if (props.onChange) {
            props.onChange(val);
        }
    };

    const dispatch = useDispatch();
    return (
        <>
            <Autocomplete
                disablePortal
                disableEscapeKeyDown
                onBackdropClick={() => false}
                value={value}
                renderInput={(params) => <TextField {...params} />}
                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                        {option.itemName} (Rs. {option.ratePerUnit} / {option.unit})
                    </Box>
                )}
                getOptionLabel={(option) => option.itemName}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.itemName);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            itemName: `Add item "${inputValue}"`,
                            ratePerUnit: 'XX',
                            unit: 'XX'
                        });
                    }
                    return filtered;
                }}
                options={items}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        onChange({
                            itemName: itemName
                        });
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        onChange({
                            itemName: newValue.inputValue
                        });
                        setOpen(true);
                    } else {
                        onChange(newValue);
                    }
                }}
            />
            <Dialog onClose={handleClose} open={open} fullWidth>
                <DialogTitle>Add New Item</DialogTitle>

                <DialogContent>
                    <Formik
                        initialValues={{
                            itemName: value?.itemName
                        }}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }, ...rest) => {
                            schema.isValid(values).then((isValid) => {
                                if (isValid) {
                                    const item = { id: Date.now(), ...values };
                                    dispatch(addItem(item));
                                    onChange(item);
                                    handleClose();
                                }
                            });
                        }}
                        validationSchema={schema}
                    >
                        {(formik) => {
                            console.log('formik items', formik.values);
                            return (
                                <Form>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <FormField label="Item Name" field="itemName" {...formik} />
                                        </Grid>
                                        <Grid item xs={6} md={4}>
                                            <Stack spacing={1} mb={2}>
                                                <InputLabel id="demo-simple-select-label">Unit</InputLabel>

                                                <UnitSelect
                                                    value={formik.values.unit}
                                                    onChange={({ value }) => formik.setFieldValue('unit', value)}
                                                />
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={6} md={4}>
                                            <Stack spacing={1} mb={2}>
                                                <InputLabel id="demo-simple-select-label">Secondary Unit</InputLabel>
                                                <UnitSelect
                                                    value={formik.values.secondaryUnit}
                                                    onChange={({ value }) => formik.setFieldValue('secondaryUnit', value)}
                                                />
                                            </Stack>
                                        </Grid>

                                        {formik.values.unit && formik.values.secondaryUnit && (
                                            <Grid item xs={12}>
                                                <InputLabel>Conversion</InputLabel>

                                                <Stack mt={2} direction="row" spacing={1} mb={2} style={{ alignItems: 'center' }}>
                                                    <InputLabel>{unitObj[formik.values.unit]}</InputLabel>
                                                    <Typography variant="overline">=</Typography>
                                                    <TextField
                                                        id="conversionRate"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.conversionRate}
                                                    />
                                                    <InputLabel>{unitObj[formik.values.secondaryUnit]}</InputLabel>
                                                </Stack>
                                            </Grid>
                                        )}

                                        {/* <Grid item xs={6} md={4}>
                                            <FormField label="Rate per unit" field="ratePerUnit" type="number" {...formik} />
                                        </Grid> */}
                                    </Grid>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="error">
                                            Cancel
                                        </Button>
                                        <Button disabled={Object.keys(formik.values).length < 1} variant="contained" type="submit">
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Form>
                            );
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Items;
