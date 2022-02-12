
import { useSelector } from 'react-redux';

import GreetingsCard from './InfoCard';

import { Grid } from '@mui/material';
import ProfileForm from './profile-form';
import MainCard from 'ui-component/cards/MainCard';

const ProfilePage = () => {
  const userState = useSelector((state) => state.user);
  console.log(userState);
  return (
    <>
      <GreetingsCard {...userState.user} /><br />
      <Grid container spacing={2} >
        <Grid item md={4}>

        </Grid>
        <Grid item md={4}>
          <MainCard title="Profile">
            <ProfileForm />
          </MainCard><br />
          <MainCard title="Change Password">
            <ProfileForm />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePage;
