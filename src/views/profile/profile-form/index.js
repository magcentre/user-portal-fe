import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput
} from '@mui/material';


import * as Yup from 'yup';
import { Formik } from 'formik';


import AnimateButton from 'ui-component/extended/AnimateButton';

import { LoadingButton } from '@mui/lab';


const ProfileForm = ({ props, userState, ...others }) => {

  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const performUpdate = async (values, { setErrors, setStatus, setSubmitting }) => {


    if (values.password === values.retypepassword) {
      setLoading(true);
      console.log(values);
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
        onSubmit={performUpdate}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>

            <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="fname-update">First Name</InputLabel>
              <OutlinedInput
                id="fname-update"
                type="text"
                value={values.firstName}
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={userState.user.firstName}
                label="First Name"
                inputProps={{}}
              />
              {touched.firstName && errors.firstName && (
                <FormHelperText error id="text-fname-update">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="lname-update">Last Name</InputLabel>
              <OutlinedInput
                id="lname-update"
                type="text"
                value={values.lastName}
                defaultValue={userState.user.lastName}
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Last Name"
                inputProps={{}}
              />
              {touched.lastName && errors.lastName && (
                <FormHelperText error id="text-lname-update">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="email-update">Email Address</InputLabel>
              <OutlinedInput
                id="email-update"
                type="email"
                value={values.email}
                name="email"
                defaultValue={userState.user.email}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="text-email-update">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>


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
                  Save
                </LoadingButton>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
