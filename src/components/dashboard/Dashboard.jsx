import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../copyright';
import { useSelector } from 'react-redux'

function preventDefault(event) {
  event.preventDefault();
}

export default function Dashboard() {
  const state = useSelector((state)=> state.authState)
  console.log('Dasshhboard', state?.user)
  // console.log('LoadDashboard', state)
  return (
    <>
    <Grid container spacing={3}>
    {/* Chart */}
    <Grid item xs={12} md={12} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 240,
        }}
      >
        <pre>
          {JSON.stringify(state?.user?.user, null, 2)}
        </pre>
      </Paper>
    </Grid>

    {/* Recent Deposits */}
    {/* <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <Deposits />
      </Paper>
    </Grid> */}

    {/* Recent Orders */}
    {/* <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Orders />
      </Paper>
    </Grid> */}
    </Grid>
    <Copyright sx={{ pt: 4 }} />
    </>
    
  );
}