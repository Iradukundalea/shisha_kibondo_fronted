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
import {useEffect} from 'react'
import { getAppointments } from '../../redux/actions/AppointmentActions'
import Loading from './Loading'
import moment from 'moment';
import { Link } from 'react-router-dom'

export default function Appointment() {
  const { appointments, loading } = useSelector((state)=> state.appointments)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAppointments())
  },[])

  return (
    <>
    <Grid container spacing={3}>
    {/* Chart */}
    <Grid item xs={12} md={8} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 240,
        }}
      >
        { loading ? 
        <Loading /> : 
       <>
        {
          !appointments?.length? (<Typography>Currently, no appointments found at this moment!.</Typography>)
          :
          (
            <>
              <Title>Appointments List</Title>
              <Table size="small" padding="checkbox">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold'}}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>DATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments?.map((row, index) => (
                  <TableRow key={index} hover={true}>
                    <TableCell>
                      <Link
                            style={{ textDecoration: 'underline'}}
                            to={`/dashboard/appointments/beneficial/${row?.beneficialId}`}
                          >
                            {row?.beneficial?.firstName} {row?.beneficial?.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>{row?.status}</TableCell>
                    <TableCell>{moment(row?.appointmentDate).fromNow()} | {new Date(row?.appointmentDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                  
                ))}
              </TableBody>
              </Table>
            </>
          )
        }
        
       </>
       } 
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



// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Title from './Title';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Steppers from './Steppers';
// import Copyright from '../copyright';
// import { useSelector, useDispatch } from 'react-redux'
// import { getBeneficials, getBeneficialsInMyRegion } from '../../redux/actions/BeneficialsActions';
// import { useEffect, useState } from 'react';
// import Loading from './Loading'
// import {getCurrentUser} from '../../utils/getCurrentUser'
// import { Link } from 'react-router-dom'
// import { getAppointments } from '../../redux/actions/AppointmentActions'


// function preventDefault(event) {
//   event.preventDefault();
// }

// export default function Beneficial() {
//   const [showAddForm, setShowAddForm] = useState(false)
//   const { beneficials, loading: loadBeneficials, message: beneficalMessage } = useSelector((state)=> state.beneficialState)
//   const dispatch = useDispatch()
//   const [currentUser, setCurrentUser] = useState('')

//   useEffect(()=>{
//       dispatch(getAppointments())
//   },[])

//   return (
//     <>
//     { showAddForm ? (
//       <Button
//       type="submit"
//       variant="contained"
//       sx={{ mb: 2 }}
//       onClick={() => setShowAddForm(false)}
//         >
//           List beneficials
//       </Button>
//     ):(
//       currentUser.role === 'Nurse' && (
//         <Button
//           type="submit"
//           variant="contained"
//           sx={{ mb: 2 }}
//           onClick={() => setShowAddForm(true)}
//             >
//               + Add new beneficial
//         </Button>
//       )
//     )}

//     <Grid container spacing={3}>
//     {/* Steppers */}
//       <Grid item xs={12} md={12} lg={12}>
//       {showAddForm ? (
//         <Paper 
//         sx={{
//           pt: 2,
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <Steppers setShowAddForm={setShowAddForm} />
//       </Paper>
//     ): 
//     (
//       <Paper
//           sx={{
//             p: 2,
//             display: 'flex',
//             flexDirection: 'column',
//             // height: 240,
//           }}
//         >
//           { loadBeneficials ? 
//             (<Loading />) : 
//             <>
//               { beneficalMessage? (<Typography>{ beneficalMessage }</Typography>) 
//               : 
//               ( 
//               <>
//                 <Title>Beneficials</Title>
//                 <Table size="small" padding="checkbox">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold'}}>Name</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold'}}>IDNUMBER</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold'}}>Email</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold'}}>Sex</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold'}}>Phone</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold'}}>Address</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold'}}>Health Center</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold'}}>JoinedAt</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {beneficials?.map((row, index) => (
//                     <TableRow key={index} >
//                       <TableCell>
//                         <Link
//                           style={{ textDecoration: 'underline'}}
//                           to={`/dashboard/users/${row?.id}`}
//                         >
//                           {row?.firstName} {row?.lastName}
//                         </Link>
//                       </TableCell>
//                       <TableCell>{row?.identityNumber}</TableCell>
//                       <TableCell>{row?.email || '-'}</TableCell>
//                       <TableCell>{row?.sex}</TableCell>
//                       <TableCell>{row?.telephone}</TableCell>
//                       <TableCell>{row?.province}, {row?.district}, {row?.sector}, {row?.cell}</TableCell>
//                       <TableCell>{row?.healthCenter}</TableCell>
//                       <TableCell>{new Date(row?.createdAt).toLocaleDateString()}</TableCell>
//                     </TableRow>
                    
//                   ))}
//                 </TableBody>
//               </Table>
//               </>
             
//               )
              
//               }
//             </>
//         }
//       </Paper>
//     )
    
//     }
//       </Grid>
//     </Grid>

//     <Copyright sx={{ pt: 4 }} />
//     </>
    
//   );
// }
