
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material/';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import sidebarimage from 'assets/images/auth/sidebar.png'

import LogoSection from 'constants/logo';
import AuthCardWrapper from 'views/registration/AuthCardWrapper';
import SideBarWrapper from 'views/registration/SideBarWrapper';
import SubscriptionList from './subscription-list';

const AuthWrapper1 = styled('div')(({ theme }) => ({
  minHeight: '100vh'
}));


const Subscription = () => {

  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

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
                          Subscription
                        </Typography>

                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <SubscriptionList />
                      <br />
                      <center>
                        <Button variant="outlined">Proceed</Button>
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