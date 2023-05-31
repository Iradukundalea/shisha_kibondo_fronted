import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import UserAvatar from '../../assets/user.avatar.svg'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useParams } from 'react-router-dom'
import { getUserDetails } from '../../redux/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import {getCurrentUser} from '../../utils/getCurrentUser'

function preventDefault(event) {
  event.preventDefault();
}

export default function UserDetails() {
  const [currentUser, setCurrentUser] = React.useState('')
  const dispatch = useDispatch()

  const { details } = useSelector((state)=> state.userState)

  const { userId} = useParams();

  React.useEffect(()=>{
    dispatch(getUserDetails(userId))
    setCurrentUser(getCurrentUser())
  }, [userId])

  return (
    <React.Fragment>
    <Grid container spacing={3}>
    {/* Chart */}
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>User Info</Typography>

        <Divider sx={{ width: '100%', my: 1 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Avatar
            sx={{ height: 80, width: 80 }}
            alt="Karim Hassan"
            src={UserAvatar}
          />
        </Box>

          <Grid>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
            Name:
          </Typography>
        
          <Typography>
            {details.firstName} {details.lastName}
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
            ID:
          </Typography>
          <Typography variant="body1">{details.identityNumber}</Typography>

          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
            Gender:
          </Typography>
          <Typography variant="body1">{details.sex}</Typography>

          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
            Status:
          </Typography>
          <Typography variant="body1">{details.status}</Typography>

          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
            Address:
          </Typography>
          
          <Typography variant="body1">
            {details.province}, {details.district}, {details.sector}, {details.cell},{' '}
            {details.village}
          </Typography>
          </Grid>        
      </Paper>
    </Grid>

    
    {/* Recent Deposits */}
    <Grid item xs={12} md={4} lg={5}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {details?.guardians?.length !== 1 ? "Guardians" : "Guardian" }

      </Paper>

      {details?.guardians ? (
        <Paper
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          <List>
          {details?.guardians?.map((guardian, index) => (
            <ListItem key={guardian.id}>
              <ListItemText
                primary={`${index + 1}. ${guardian?.firstName} ${guardian?.lastName}`}
                secondary={
                  <>
                    <div>ID: {guardian.identityNumber}</div>
                    <div>Phone: {guardian.telephone}</div>
                    <div>Sex: {guardian.sex}</div>
                  </>
                }
              />
            </ListItem>
          ))}
          </List>

          {/* show add new guardian button */}
          { currentUser.role === 'Nurse' && (
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                p: 2
              }}
            >
              <Button
                  // type="submit"
                  size="small"
                  variant="outlined"
                  // sx={{ mt: 2, mb: 2, mr:4 }}
                >
                  + Add new guardian
              </Button>
            </Box>
          )}
          
          
        </Paper>
      ): '' }
     
    </Grid>

    {/* Recent Deposits */}
    <Grid item xs={12} md={4} lg={4}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        Taking up Records
      </Paper>
    </Grid>

    
    </Grid>
    </React.Fragment>
  );
}