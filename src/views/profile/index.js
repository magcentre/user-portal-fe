
import { useSelector } from 'react-redux';

import GreetingsCard from './InfoCard';

import { Grid } from '@mui/material';
import ProfileForm from './profile-form';
import MainCard from 'ui-component/cards/MainCard';
import ChangePasswordForm from './change-password';

const ProfilePage = () => {
  const userState = useSelector((state) => state.user);
  
  return (
    <>
      <GreetingsCard {...userState.user} /><br />
      <Grid container spacing={2} >
        <Grid item md={4}>

        </Grid>
        <Grid item md={4}>
          <MainCard title="Profile">
            <ProfileForm userState={userState} />
          </MainCard><br />
          <MainCard title="Change Password">
            <ChangePasswordForm />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePage;
