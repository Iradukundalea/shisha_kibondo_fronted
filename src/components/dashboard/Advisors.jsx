import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems, thirdListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import {useEffect} from 'react'
import { getAdvisors } from '../../redux/actions/AdvisorActions'
import Loading from './Loading'
import AddAdvisor from './AddAdvisor'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Advisor() {
  const state = useSelector((state)=> state.authState)
  const { advisors, loading } = useSelector((state)=> state.advisorState)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAdvisors())
  },[])

  console.log('CCCCCCCCCCCCCcc', loading)
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
      //  <Typography>Loading...</Typography> :
        <Loading /> : 
       <>
        {/* <Title>Recent Orders</Title> */}
        <Table size="small" padding="checkbox">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* <TableCell>LastName</TableCell> */}
              <TableCell>Email</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Phone</TableCell>
              {/* <TableCell>Degree</TableCell> */}
              {/* <TableCell>Specilialized</TableCell> */}
              <TableCell><b>JoinedAt</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advisors?.map((row, index) => (
              <TableRow key={index} hover={true}>
                <TableCell>{row?.firstName} {row?.lastName}</TableCell>
                {/* <TableCell>{row.lastName}</TableCell> */}
                <TableCell>{row?.email}</TableCell>
                <TableCell>{row?.sex}</TableCell>
                <TableCell>{row?.telephone}</TableCell>
                {/* <TableCell>{row.degree}</TableCell> */}
                {/* <TableCell>{row.specialized}</TableCell> */}
                <TableCell>{new Date(row?.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
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
        {/* <AddAdvisor addNewAdvisor={handleAddAdvisor} /> */}
        <AddAdvisor />
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