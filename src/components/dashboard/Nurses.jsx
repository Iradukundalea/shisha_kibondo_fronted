import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getNurses } from '../../redux/actions/NursesActions'

import Loading from './Loading'
import AddNurse from './AddNurse';
import { formattedTimestamp } from '../../utils/formatTime';

function preventDefault(event) {
  event.preventDefault();
}

export default function Nurses() {
  const state = useSelector((state)=> state.authState)
  const { nurses, loading, message } = useSelector((state)=> state.nurseState)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getNurses())
  },[])

  return (
    <>
    <Grid container spacing={3}>
    {/* Chart */}
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 240,
        }}
      >
        {/* <Typography>State: {state?.user?.loginToken}</Typography> */}
        { loading ? 
          <Loading /> : 
       <>
        { message? <Typography>{ message }</Typography> 
        : 
          <>
            <Title>Nurses</Title>
            <Table size="small" padding="checkbox">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold'}}>Name</TableCell>
                  {/* <TableCell>LastName</TableCell> */}
                  <TableCell sx={{ fontWeight: 'bold'}}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>Sex</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>Address</TableCell>
                  {/* <TableCell>Specilialized</TableCell> */}
                  <TableCell sx={{ fontWeight: 'bold'}}>JoinedAt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nurses?.map((row, index) => (
                  <TableRow key={index} hover={true}>
                    <TableCell>{row?.firstName} {row?.lastName}</TableCell>
                    {/* <TableCell>{row.lastName}</TableCell> */}
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>{row?.sex}</TableCell>
                    <TableCell>{row?.telephone}</TableCell>
                    <TableCell>
                      {row?.province}, {row?.district}, 
                      {row?.sector}, {row?.cell}, 
                      {row?.village}
                    </TableCell>
                    {/* <TableCell>{row.specialized}</TableCell> */}
                    <TableCell>{formattedTimestamp(row?.createdAt)}</TableCell>
                  </TableRow>
                  
                ))}
              </TableBody>
            </Table>
          </>
        
        }
        
       </>
       } 
      </Paper>
    </Grid>
    
    {/* Recent Deposits */}
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 240,
        }}
      >
        <AddNurse />
        
      </Paper>
    </Grid>

    {/* Recent Orders */}
    <Grid item xs={12}>
      {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
        {/* <Orders /> */}
      {/* </Paper> */}
    </Grid>
    </Grid>
    {/* <Copyright sx={{ pt: 4 }} /> */}
    </>
    
  );
}