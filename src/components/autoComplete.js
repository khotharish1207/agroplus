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
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { addItem } from 'store/reducers/items';

const schema = Yup.object().shape({
    itemName: Yup.string().min(1, 'Too Short!').required('Required'),
    unit: Yup.string().required('Required'),
    ratePerUnit: Yup.number().required().positive().integer().required('Required')
});

const filter = createFilterOptions();

export const AutoComplete = ({
    options: optionsArr,
    value: propsValue,
    onChange: onSelect,
    exclude = [],
    only = [],
    labelField = 'label',
    NewTemplate = React.Fragment,
    ...props
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState(optionsArr);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (propsValue && !value) {
            const selected = optionsArr.find((u) => u.value === propsValue);
            setValue(selected);
        }
        if (exclude.length) {
            setOptions(optionsArr.filter((u) => !exclude.includes(u.value)));
        }
        if (only.length > 0) {
            setOptions(optionsArr.filter((u) => only.includes(u.value)));
        }
    }, [propsValue, exclude, only]);

    const onChange = (val, event) => {
        setValue(val);
        if (onSelect) {
            onSelect(val, event);
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
                getOptionLabel={(item) => item[labelField]}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option[labelField]);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            [labelField]: `Add "${inputValue}"`
                        });
                    }
                    return filtered;
                }}
                options={options}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        onChange(
                            {
                                itemName: itemName
                            },
                            event
                        );
                    } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input
                        onChange(
                            {
                                [labelField]: newValue.inputValue
                            },
                            event
                        );
                        setOpen(true);
                    } else {
                        onChange(newValue, event);
                    }
                }}
                {...props}
            />
            <Dialog onClose={handleClose} open={open} fullWidth>
                <DialogTitle>Add New </DialogTitle>
                <DialogContent>
                    <NewTemplate onClose={handleClose} />
                </DialogContent>

                {/* <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
};

export default AutoComplete;
