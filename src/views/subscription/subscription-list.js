import * as React from 'react';
import Grid from '@mui/material/Grid';
import SubscriptionCard from './subscription-card';

export default function SubscriptionList() {
  const [selectedKey, setKey] = React.useState(1);
  const list = [
    {
      key: 1,
      title: 'Free Plan',
      storage: '100 GB Storage',
      price: 'Free'
    },
    {
      key: 2,
      title: 'Premium Plan',
      storage: 'Unlimited Storage',
      price: '$20'
    }
  ]
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        {list.map((e) => {
          return (
            <Grid item>
              <div onClick={() => { setKey(e.key) }}>
                <SubscriptionCard selected={selectedKey === e.key} {...e} />
              </div>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}
