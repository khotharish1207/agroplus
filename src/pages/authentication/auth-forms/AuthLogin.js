import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import {
    Alert,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import Alerts from 'components/Alerts';

//actions
import { login } from 'store/reducers/actions';
import { setAuth, setToken } from 'store/reducers/app';

// assets
import { EyeOutlined, EyeInvisibleOutlined, SyncOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const checkAuth = ({ password, mobile }) => {
        dispatch(
            login({
                data: { password, mobile },
                onSuccess: () => {
                    navigate('/');
                },
                onFail: (err) => setAuthError(true)
            })
        );

        // axios({
        //     method: 'GET',
        //     url: `https://api.agroplus.co.in/api/Register/GetLogin/${mobile}/${password}`
        // })
        //     .then((data) => {
        //         // console.log(data);
        //         window.localStorage.setItem('agroplus-token', data?.data);
        //         dispatch(setToken(data));
        //         navigate('/');
        //     })
        //     .catch(() => setAuthError(true));
    };

    return (
        <>
            {authError && <Alerts severity="error" message="Auth error" onClose={() => setAuthError(false)} />}

            <Formik
                initialValues={{
                    password: '',
                    mobile: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    mobile: Yup.string()
                        .matches(/^[6-9]\d{9}$/, {
                            message: 'Please enter valid number.',
                            excludeEmptyString: false
                        })
                        .required('Mobile is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, setFieldError, ...other }, ...rest) => {
                    try {
                        setLoading(true);
                        await checkAuth(values);
                        setStatus({ success: false });
                        setLoading(false);
                        // dispatch(login()); // saga call
                    } catch (err) {
                        setStatus({ success: false });
                        setFieldError('submit', err.message);
                        setLoading(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setSubmitting, ...rest }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <Alert severity="error">{errors.submit}</Alert>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="mobile-login">Mobile</InputLabel>
                                    <OutlinedInput
                                        id="mobile-login"
                                        // type="email"
                                        value={values.mobile}
                                        name="mobile"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter mobile"
                                        fullWidth
                                        disabled={loading}
                                        error={Boolean(touched.mobile && errors.mobile)}
                                    />
                                    {touched.mobile && errors.mobile && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.mobile}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                        disabled={loading}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="h6">Keep me sign in</Typography>}
                                    />
                                    <Link variant="h6" component={RouterLink} to="" color="text.primary">
                                        Forgot Password?
                                    </Link>
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        // disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setSubmitting(true)}
                                        startIcon={loading ? <SyncOutlined spin /> : null}
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
