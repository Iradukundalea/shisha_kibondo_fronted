import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {getCurrentUser} from '../../utils/getCurrentUser'
import { getBeneficialAppointments } from '../../redux/actions/AppointmentActions';
import RendezVous from './Calendar';
import moment from 'moment';

function preventDefault(event) {
  event.preventDefault();
}

export default function BeneficialAppointment() {
  const { userId  } = useParams()

  const dispatch = useDispatch()

  const [showCalendar, setshowCalendar] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState('')

  const { list_appointments } = useSelector(
    ({
      appointments: { list_appointments },
    }) => ({
        list_appointments,
    })
  );

  React.useEffect(()=>{
    setCurrentUser(getCurrentUser())

    dispatch(getBeneficialAppointments(userId))

  },[])

  const isShowCalendar =(value)=>{
    setshowCalendar(value)
  }

  return (
    <>
    { currentUser.role === 'Nurse' && (
      <Button
        type="submit"
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => isShowCalendar(true)}
          >
            + Set New Appointment
      </Button>
    )}
    
    <Grid container spacing={3}>
    
      {/* Product category Table transactions */}
      <Grid item xs={12} md={12} lg={ showCalendar ? 9 : 12}>
      <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              // height: 240,
            }}
          > 
          {!list_appointments?.length? (<Typography>Beneficiary has no any appointment, so assign one!.</Typography>)
          : 
            (
                <Table size="small" padding="checkbox">
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ fontWeight: 'bold'}}>NAME</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>STATUS</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>EXPIRATION DATE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list_appointments?.map((appointment, index)=>(
                        <>
                        <TableRow key={index}>
                            {appointment?.beneficial && (
                                <TableCell>
                                    {appointment?.beneficial.firstName} {appointment?.beneficial.lastName}
                                </TableCell>
                            )}
                            
                            <TableCell>{appointment.status}</TableCell>
                            <TableCell>
                            {moment(appointment?.appointmentDate).fromNow()} | {appointment.appointmentDate}
                            </TableCell>
                        </TableRow>
                        </>
                    ))}
                </TableBody>
                </Table>
            )
          }
        </Paper>
      </Grid>
      
      { showCalendar && (
        <Grid item xs={12} md={4} lg={3}>
            <Paper 
                sx={{ padding: 2}}
            >
                <div 
                    style={{ 
                    display: 'flex', 
                    justifyContent: 'right',
                    cursor: 'pointer',
                    marginBottom: '10px'
                    }}
                >
                    <span onClick={()=> isShowCalendar(false)}>x</span>
                </div>
                <RendezVous beneficialId={ userId } setshowCalendar={setshowCalendar}/>
            </Paper>
            
        </Grid>
        
        ) }

    </Grid>
    <Copyright sx={{ pt: 4 }} />
    </>
  );
}
