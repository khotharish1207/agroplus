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
    TextField
} from '@mui/material';
import FormField from 'components/FormField';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { addItem } from 'store/reducers/items';

const schema = Yup.object().shape({
    itemName: Yup.string().min(1, 'Too Short!').required('Required'),
    unit: Yup.string().required('Required'),
    ratePerUnit: Yup.number().required().positive().integer().required('Required')
});

const filter = createFilterOptions();

export const Items = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = React.useState(null);
    const itemOptions = useSelector((state) => state.items);
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
                options={itemOptions}
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
                <DialogTitle>Add Item</DialogTitle>

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
                            return (
                                <Form>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <FormField label="Item Name" field="itemName" {...formik} />
                                        </Grid>
                                        <Grid item xs={6} md={4}>
                                            <Stack spacing={1} mb={2}>
                                                <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="unit-label"
                                                    id="unit-select"
                                                    label="Unit"
                                                    name="unit"
                                                    onChange={formik.handleChange}
                                                >
                                                    <MenuItem value="kg">Kg</MenuItem>
                                                </Select>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={6} md={4}>
                                            <FormField label="Rate per unit" field="ratePerUnit" type="number" {...formik} />
                                        </Grid>
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
