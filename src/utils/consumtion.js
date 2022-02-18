import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ConsumtionCard = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  alignContent: 'center',
  color: theme.palette.secondary.dark,
  height: 50,
  backgroundColor: theme.palette.primary,
}));



const StorageConsumption = (props) => {
  return (
    <>
      <ConsumtionCard>
        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item>
            <Typography variant="h5" gutterBottom component="div">
              Storage Consumption
            </Typography>
          </Grid>
          <Grid item >
            <IconButton aria-label="delete" size="small" color="primary">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </ConsumtionCard>
    </>
  )
};

export default StorageConsumption;