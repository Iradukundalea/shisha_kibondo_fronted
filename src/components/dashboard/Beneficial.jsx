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
import Button from '@mui/material/Button';
import Steppers from './Steppers';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import { getBeneficials, getBeneficialsInMyRegion } from '../../redux/actions/BeneficialsActions';
import { useEffect, useState } from 'react';
import Loading from './Loading'
import {getCurrentUser} from '../../utils/getCurrentUser'
import { Link } from 'react-router-dom'

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
      <Grid item xs={12} md={12} lg={12}>
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
              ( 
              <>
                <Title>Beneficials</Title>
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
                    <TableCell sx={{ fontWeight: 'bold'}}>Height</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>Weight</TableCell>
                    <TableCell sx={{ fontWeight: 'bold'}}>MUAC</TableCell>
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
                      <TableCell>{row?.height ? `${row?.height} m`  : '-'}</TableCell>
                      <TableCell>{row?.weight ? `${row?.weight} kg`  : '-'}</TableCell>
                      <TableCell>{row?.MUAC ? `${row?.MUAC}`  : '-'}</TableCell>
                      <TableCell>{new Date(row?.createdAt).toLocaleDateString()}</TableCell>
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
    )
    
    }
      </Grid>
    </Grid>

    <Copyright sx={{ pt: 4 }} />
    </>
    
  );
}