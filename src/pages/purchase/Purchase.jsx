import { PlusOutlined } from '@ant-design/icons';
// material-ui
import { Button, Grid, Typography, List, ListItem, Divider, ListItemText } from '@mui/material';
import AddItem from 'components/AddItemModal';
import FormField from 'components/FormField';
// project import
import MainCard from 'components/MainCard';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const Purchase = () => {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const units = useSelector((state) => state.units);

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
                                        <FormField label="Account Name" field="accountName" {...formik} />
                                        <FormField label="Plot Name" field="plotName" {...formik} />
                                        <FormField label="Category" field="category" {...formik} />
                                        <Grid item sm={8}>
                                            <Typography variant="h5">Items</Typography>
                                            {/* <pre>{JSON.stringify(items, null, 4)}</pre> */}
                                            <List>
                                                {items.map(({ item, quantity, ratePerUnit, unit, total }) => {
                                                    return (
                                                        <ListItem alignItems="flex-start">
                                                            <ListItemText
                                                                primary={`${item.itemName} - ${quantity} ${unit}`}
                                                                secondary={`${quantity} * ${ratePerUnit} = ${total}`}
                                                            />
                                                            <Divider />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
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
