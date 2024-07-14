import { PlusOutlined } from '@ant-design/icons';
// material-ui
import { Button, Divider, Grid, InputLabel, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import AccountSelect from 'components/AccountSelect';
import AddItem from 'components/AddItemModal';
import FormField from 'components/FormField';
import AutoComplete from 'components/autoComplete';
// project import
import MainCard from 'components/MainCard';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Purchase = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const { units, plot } = useSelector(({ units, plot }) => ({ units, plot }));

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    return (
        <Grid container>
            <Grid xs={12}>
                <MainCard>
                    <Formik
                        initialValues={{}}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => {
                            return (
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid item sm={8}>
                                        <Grid item>
                                            <Stack spacing={1} mb={2}>
                                                <InputLabel id="unit-select">Account Name</InputLabel>
                                                <AccountSelect
                                                    value={formik.values.accountName}
                                                    onChange={({ value }) => formik.setFieldValue('accountName', value ?? '')}
                                                />
                                            </Stack>
                                        </Grid>

                                        <Grid item>
                                            <Stack spacing={1} mb={2}>
                                                <InputLabel id="unit-select">Plot Name</InputLabel>
                                                <AutoComplete
                                                    label="Plot Name"
                                                    options={plot}
                                                    labelField="PlotName"
                                                    onAddNew={(newVal) => navigate('/plot', { state: { ...newVal } })}
                                                />
                                            </Stack>
                                        </Grid>

                                        {/* <FormField label="Plot Name" field="plotName" {...formik} /> */}

                                        <FormField label="Category" field="category" {...formik} />
                                        <Grid item sm={8}>
                                            <Typography variant="h5">Items</Typography>
                                            <List sx={{ bgcolor: 'background.paper' }}>
                                                {items.map(({ item, quantity, ratePerUnit, unit, total }) => {
                                                    return (
                                                        <>
                                                            <ListItem alignItems="flex-start">
                                                                <ListItemText
                                                                    primary={`${item.itemName} - ${quantity} ${unit}`}
                                                                    secondary={`${quantity} * ${ratePerUnit} = ${total}`}
                                                                />
                                                            </ListItem>
                                                            <Divider component="li" />
                                                        </>
                                                    );
                                                })}
                                            </List>
                                            {items.length > 0 && (
                                                <Typography>
                                                    Total ={' '}
                                                    {items.reduce((total, i) => {
                                                        total += i.total;
                                                        return total;
                                                    }, 0)}
                                                </Typography>
                                            )}
                                            <Button variant="outlined" startIcon={<PlusOutlined />} onClick={onOpen}>
                                                Add Item
                                            </Button>
                                        </Grid>
                                        <FormField label="Description" field="description" multiline {...formik} />
                                        <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
                                            Save
                                        </Button>
                                    </Grid>
                                </form>
                            );
                        }}
                    </Formik>
                    <AddItem
                        open={open}
                        handleClose={onClose}
                        onSave={(item) => {
                            setItems([...items, item]);
                        }}
                    />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Purchase;
