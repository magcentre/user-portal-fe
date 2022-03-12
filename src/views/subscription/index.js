
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import sidebarimage from 'assets/images/auth/sidebar.png'

import LogoSection from 'constants/logo';
import AuthCardWrapper from 'views/registration/AuthCardWrapper';
import SideBarWrapper from 'views/registration/SideBarWrapper';
import SubscriptionList from './subscription-list';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

const AuthWrapper1 = styled('div')(({ theme }) => ({
  minHeight: '100vh'
}));


const Subscription = () => {

  const theme = useTheme();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const proceed = () => {
    enqueueSnackbar('You are enrolled successfully!');
    navigate("/dashboard");
  }

  return (
    <AuthWrapper1>
      <Stack>
        <Grid container direction="row"
          justifyContent="center"
          alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6} lg={6}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <AuthCardWrapper>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item>
                      <LogoSection />
                    </Grid>
                    <Grid item xs={12}>
                      <center>
                        <Typography
                          color={theme.palette.secondary.main}
                          gutterBottom
                          variant={'h3'}
                        >
                          Subscription
                        </Typography>
                      </center>
                    </Grid>
                    <Grid item xs={12}>
                      <SubscriptionList />
                      <br />
                      <center>
                        <Button variant="outlined" onClick={proceed}>Proceed</Button>
                      </center>
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} lg={6}>
            <SideBarWrapper>
              <Grid container
                direction="row"
                justifyContent="center"
                sx={{ minHeight: 'calc(100vh - 68px)' }}
                alignItems="center">
                <img src={sidebarimage} alt="side-bar" />
              </Grid>
            </SideBarWrapper>
          </Grid>
        </Grid>
      </Stack>
    </AuthWrapper1>
  );
};

export default Subscription;