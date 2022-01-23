import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from 'assets/images/icons/trash-primary.svg'
import { Typography } from '@mui/material';
import StorageConsumption from 'utils/consumtion';

const WarningItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  alignContent: 'center',
  background: theme.palette.primary.light,
  color: theme.palette.secondary.dark,
  height: 50,
  backgroundColor: theme.palette.primary,
}));



const InfoCard = (props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <WarningItem>
            <Grid container
              direction="row"
              justifyContent="flex-start"
              spacing={3}
              alignItems="center">
              <Grid item>
                <img src={DeleteIcon} height={30} />
              </Grid>
              <Grid item>
                <Typography variant="h5" gutterBottom component="div">
                  Items are deleted forever after 30 days.
                </Typography>
              </Grid>
            </Grid>
          </WarningItem>
        </Grid>
        <Grid item xs={6} md={4}>
          <StorageConsumption />
        </Grid>
      </Grid>
    </>
  )
};

export default InfoCard;