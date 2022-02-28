
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import RegistrationForm from './auth-form';

import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import SideBarWrapper from './SideBarWrapper';

import sidebarimage from 'assets/images/auth/sidebar.png'


const Register = () => {

  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Stack>
        <Grid container direction="row"
          justifyContent="center"
          alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item md={6} lg={6}>
            <SideBarWrapper>
              <Grid container
                direction="row"
                justifyContent="center"
                sx={{ minHeight: 'calc(100vh - 68px)' }}
                alignItems="center">
                <img src={sidebarimage} alt="side-bar-register" />
              </Grid>
            </SideBarWrapper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction={matchDownSM ? 'column-reverse' : 'row'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          color={theme.palette.secondary.main}
                          gutterBottom
                          variant={matchDownSM ? 'h3' : 'h2'}
                        >
                          Sign up
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <RegistrationForm />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </AuthWrapper1>
  );
};

export default Register;
