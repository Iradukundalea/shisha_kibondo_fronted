import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAdvisors } from '../../redux/actions/AdvisorActions'
import Typography from '@mui/material/Typography';
import Loading from './Loading'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const { advisors, loading } = useSelector((state)=> state.advisorState)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAdvisors())
  },[])

  console.log('CCCCCCCCCCCCCcc', loading)

  return (
    <React.Fragment>
      <Paper>
       { loading ? 
      //  <Typography>Loading...</Typography> :
        <Loading /> : 
       <>
        <Title>Recent Orders</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Specilialized</TableCell>
              <TableCell>JoinedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advisors?.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.sex}</TableCell>
                <TableCell>{row.telephone}</TableCell>
                <TableCell>{row.degree}</TableCell>
                <TableCell>{row.specialized}</TableCell>
                <TableCell>{new Date(row.createdAt).getFullYear()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
       </>
       } 
      </Paper>
    </React.Fragment>
  );
}