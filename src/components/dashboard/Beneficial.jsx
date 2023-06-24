import * as React from 'react';
// import Link from '@mui/material/Link';
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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems, thirdListItems } from './listItems';
import Chart from './Chart';
import CheckCategory from './CheckCategory';
import Steppers from './Steppers';
import Orders from './Orders';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import { getBeneficials, getBeneficialsInMyRegion } from '../../redux/actions/BeneficialsActions';
import { useEffect, useState } from 'react';
import Loading from './Loading'
import {getCurrentUser} from '../../utils/getCurrentUser'
import { Link } from 'react-router-dom'

function preventDefault(event) {
  event.preventDefault();
}

export default function Beneficial() {
  const [showAddForm, setShowAddForm] = useState(false)
  const { beneficials, loading: loadBeneficials, message: beneficalMessage } = useSelector((state)=> state.beneficialState)
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState('')

  useEffect(()=>{
    setCurrentUser(getCurrentUser())
    if(currentUser.role === 'umujyanama wubuzima'){
      dispatch(getBeneficialsInMyRegion())
    }
    else{
      dispatch(getBeneficials())
    }
  },[currentUser.role])

  return (
    <>
    { showAddForm ? (
      <Button
      type="submit"
      variant="contained"
      sx={{ mb: 2 }}
      onClick={() => setShowAddForm(false)}
        >
          List beneficials
      </Button>
    ):(
      currentUser.role === 'Nurse' && (
        <Button
          type="submit"
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => setShowAddForm(true)}
            >
              + Add new beneficial
        </Button>
      )
    )}

    <Grid container spacing={3}>
    {/* Steppers */}
      <Grid item xs={12} md={8} lg={12}>
      {showAddForm ? (
        <Paper 
        sx={{
          pt: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Steppers setShowAddForm={setShowAddForm} />
      </Paper>
    ): 
    (
      <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            // height: 240,
          }}
        >
          { loadBeneficials ? 
            (<Loading />) : 
            <>
              { beneficalMessage? (<Typography>{ beneficalMessage }</Typography>) 
              : 
              <Table size="small" padding="checkbox">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold'}}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>IDNUMBER</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>Sex</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>Health Center</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>JoinedAt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {beneficials?.map((row, index) => (
                    <TableRow key={index} >
                      <TableCell>
                        <Link
                          style={{ textDecoration: 'underline'}}
                          to={`/dashboard/users/${row?.id}`}
                        >
                          {row?.firstName} {row?.lastName}
                        </Link>
                      </TableCell>
                      <TableCell>{row?.identityNumber}</TableCell>
                      <TableCell>{row?.email || '-'}</TableCell>
                      <TableCell>{row?.sex}</TableCell>
                      <TableCell>{row?.telephone}</TableCell>
                      <TableCell>{row?.province}, {row?.district}, {row?.sector}, {row?.cell}</TableCell>
                      <TableCell>{row?.healthCenter}</TableCell>
                      <TableCell>{new Date(row?.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                    
                  ))}
                </TableBody>
              </Table>
              }
            </>
        }
      </Paper>
    )
    
    }
      </Grid>
    </Grid>

    <Copyright sx={{ pt: 4 }} />
    </>
    
  );
}