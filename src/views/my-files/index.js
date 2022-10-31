import * as React from "react";
import Grid from "@mui/material/Grid";
import StorageConsumption from "utils/consumtion";
import Personalvault from "utils/personal-vault";

const VaultSetup = (props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} md={8}>
          <Personalvault />
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <StorageConsumption type={"Storage Consumption "} />
        </Grid>
      </Grid>
    </>
  );
};

export default VaultSetup;
