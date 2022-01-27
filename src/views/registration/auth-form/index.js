import { useState } from 'react';
import { useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';


import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom"


import AnimateButton from 'ui-component/extended/AnimateButton';

import Visibility from '@mui/icons-material/Visibility';

import VisibilityOff from '@mui/icons-material/VisibilityOff';

import netwotk from 'helpers/network.helper';

import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';


const RegistrationForm = ({ props, ...others }) => {

  const theme = useTheme();

  let navigate = useNavigate()

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handelClickShowVerifyPassword = () => {
    setShowVerifyPassword(!showVerifyPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const perfromLogin = async (values, { setErrors, setStatus, setSubmitting }) => {


    if (values.password === values.retypepassword) {
      setLoading(true);
      console.log(values);
      netwotk.post('/identity/user/create', values).then((e) => {
        enqueueSnackbar('Your account is created successfully!');
        navigate('/login');
      }).catch((e) => {
        setStatus({ success: false });
        setLoading(false);
        setErrors({ submit: "Account with same email already exists" });
      })
    } else {
      setErrors({ submit: "Password mis-match please check password and verify password" });
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={perfromLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>

            <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="fname-register">First Name</InputLabel>
              <OutlinedInput
                id="fname-register"
                type="text"
                value={values.firstName}
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="First Name"
                inputProps={{}}
              />
              {touched.firstName && errors.firstName && (
                <FormHelperText error id="text-fname-register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="lname-register">Last Name</InputLabel>
              <OutlinedInput
                id="lname-register"
                type="text"
                value={values.lastName}
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Last Name"
                inputProps={{}}
              />
              {touched.lastName && errors.lastName && (
                <FormHelperText error id="text-lname-register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="email-register">Email Address</InputLabel>
              <OutlinedInput
                id="email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="text-email-register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="password-register">Password</InputLabel>
              <OutlinedInput
                id="password-register"
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
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="password-register-retype">Verify Password</InputLabel>
              <OutlinedInput
                id="password-register-retype"
                type={showVerifyPassword ? 'text' : 'password'}
                value={values.retyped}
                name="retypepassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handelClickShowVerifyPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showVerifyPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <div></div>
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2, color: 'white' }}>
              <AnimateButton>
                <LoadingButton
                  loading={loading}
                  loadingPosition="end"
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    color: 'white'
                  }}
                >
                  Sign up
                </LoadingButton>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationForm;
