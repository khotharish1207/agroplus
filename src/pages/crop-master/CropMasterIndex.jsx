import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Grid, Button, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { DeleteFilled } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import FormField from 'components/FormField';
import Alert from 'components/Alerts';

import { fetchCrops, addCrop as pushCrop, removeCrop } from 'store/reducers/actions';

export const Crop = () => {
    const [alertProps, setAlert] = React.useState({ show: false });

    const dispatch = useDispatch();
    const crops = useSelector((state) => state.crop);

    const onCloseAlert = () => setAlert({ ...alertProps, show: false });

    const addCrop = ({ cropName }) => {
        dispatch(
            pushCrop({
                cropName,
                onSuccess: () =>
                    setAlert({
                        show: true,
                        severity: 'success',
                        message: `${cropName} has been added`
                    }),
                onFail: () =>
                    setAlert({
                        show: true,
                        severity: 'error',
                        message: `Error while adding crop`
                    })
            })
        );
    };

    const deleteCrop = (cropName) => {
        dispatch(
            removeCrop({
                cropName,
                onSuccess: () =>
                    setAlert({
                        show: true,
                        severity: 'success',
                        message: `${cropName} has been deleted`
                    })
            })
        );
    };

    React.useEffect(() => dispatch(fetchCrops()), []);

    return (
        <Grid container>
            <Grid xs={12}>
                <MainCard>
                    <Formik
                        initialValues={{}}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                            addCrop(values);
                            resetForm();
                        }}
                    >
                        {(formik) => {
                            return (
                                <form onSubmit={formik.handleSubmit}>
                                    <Alert {...alertProps} onClose={onCloseAlert} />
                                    <Grid item sm={8}>
                                        <FormField label="Crop Name" field="cropName" {...formik} />
                                        <Button variant="outlined" type="submit" disabled={formik.isSubmitting}>
                                            Save
                                        </Button>
                                    </Grid>
                                    <br />
                                    <Divider>Crop List</Divider>
                                    <br />

                                    <Grid item sm={8}>
                                        <List>
                                            {[...crops]
                                                .sort((a, b) => a.CropName > b.CropName)
                                                .map(({ CropName }) => (
                                                    <ListItem
                                                        secondaryAction={
                                                            <IconButton onClick={() => deleteCrop(CropName)} edge="end" aria-label="delete">
                                                                <DeleteFilled />
                                                            </IconButton>
                                                        }
                                                    >
                                                        <ListItemText primary={CropName} />
                                                    </ListItem>
                                                ))}
                                        </List>
                                    </Grid>
                                </form>
                            );
                        }}
                    </Formik>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Crop;
