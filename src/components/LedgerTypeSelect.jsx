import React from 'react';
import _ from 'lodash';
import { MenuItem, Select, Grid, Stack, InputLabel, Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Select from './Select';
const filter = createFilterOptions();

const assets = [
    {
        groupName: 'Crrent asset',
        under: 'Bank Account'
    }
];

const liabilities = [{ groupName: 'Loans (Liability)', under: 'Bank OD' }];
const expenses = [{ groupName: 'Direct expenses', under: 'Direct expenses' }];

const LedgerTypeSelect = ({ onChange, rest }) => {
    const navigate = useNavigate();

    const getMenuItems = (type, items = [], isMenu = true) => {
        return isMenu
            ? [
                  <MenuItem disabled value="">
                      <em>{type}</em>
                  </MenuItem>,
                  ...items.map(({ under, groupName }) => (
                      <MenuItem key={under} value={`${type}-${under}-${groupName}`}>
                          {under} - {type}
                      </MenuItem>
                  ))
              ]
            : items.map(({ under, groupName }) => ({
                  label: under,
                  value: `${type}-${under}-${groupName}`
              }));
    };
    return (
        <Grid item>
            <Stack spacing={1} mb={2}>
                <InputLabel htmlFor={'select-under'}>Ledger Type</InputLabel>
              
                <Autocomplete
                    disablePortal
                    fullWidth
                    freeSolo
                    options={[
                        ...getMenuItems('Assets', assets, false),
                        ...getMenuItems('Liabilities', liabilities, false),
                        ...getMenuItems('Expenses', expenses, false)
                    ]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(event, newValue) => {
                        console.log(newValue);
                        if (typeof newValue === 'string') {
                            //   setValue({
                            //     title: newValue,
                            //   });
                        } else if (newValue && newValue?.newLedger) {
                            // Create a new value from the user input
                            //   setValue({
                            //     title: newValue.inputValue,
                            //   });
                            navigate('/ledger', { state: { newLedger: newValue?.newLedger } });
                        } else {
                            onChange(newValue?.value);
                        }
                    }}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.label;
                        }
                        // Regular option
                        return option.label;
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option.label);
                        if (inputValue !== '' && !isExisting) {
                            filtered.push({
                                newLedger: inputValue,
                                label: `Add "${inputValue}"`
                            });
                        }

                        return filtered;
                    }}
                />
            </Stack>
        </Grid>
    );
};

export default LedgerTypeSelect;
