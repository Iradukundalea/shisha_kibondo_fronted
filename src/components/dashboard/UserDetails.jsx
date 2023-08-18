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
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams, Link } from 'react-router-dom'
import { getUserDetails } from '../../redux/actions/UserActions';
import { getBeneficialTakingUpTransactions } from '../../redux/actions/TakingUpActions'
import { listProductsAction } from '../../redux/actions/ProductActions';
import { donateToBeneficial } from '../../redux/actions/TakingUpActions'; 
import { useDispatch, useSelector } from 'react-redux';
import {getCurrentUser} from '../../utils/getCurrentUser'
import AddGuardianForm from './AddGuardian';
import Modal from './Modal'

function preventDefault(event) {
  event.preventDefault();
}

export default function UserDetails() {
  const [currentUser, setCurrentUser] = React.useState('')
  const [showDonateForm, setShowDonateForm] = React.useState(false)
  const [productCatId, setProductCatId] = React.useState('')
  const [quantity, setQuantity] = React.useState('')
  const [showAddGuardianForm, setShowAddGuardianForm] = React.useState(false)

  const [showModal, setShowModal] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const dispatch = useDispatch()

  const { details, list: productsList, transactions, loading: loadingTakeup, message: takeUpMessage, detailsLoading } = useSelector(({
    userState: { details, loading: detailsLoading },
    productState: { list },
    takeUpState: { transactions, loading, message },
  }) => ({
    details,
    list,
    transactions,
    loading,
    message,
    detailsLoading
  }))

  const { userId } = useParams();

  React.useEffect(()=>{
    dispatch(getUserDetails(userId))
    dispatch(getBeneficialTakingUpTransactions(userId))
    dispatch(listProductsAction())

    setCurrentUser(getCurrentUser())
  }, [userId])

  const handleProductChange = (event) =>{
    setProductCatId(event.target.value)
  }
  const handleQuantityChange = (event) =>{
    setQuantity(event.target.value)
  }
  const handleShowDonateForm = () =>{
    setShowDonateForm(false)
  }
  const handleFormClear = () =>{
    setProductCatId('')
    setQuantity('')
  }
  const handleDonateSubmit = (event) =>{
    // preventDefault(event)
    event.preventDefault()

    dispatch(donateToBeneficial(productCatId, userId, quantity, setShowDonateForm, handleFormClear))
  }

  

  return (
    <React.Fragment>
    <Modal 
      open={open} 
      handleOpen={handleOpen} 
      handleClose={handleClose}
      user={details}
    />

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
          <Divider sx={{ width: '100%', my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to={`/dashboard/appointments/beneficial/${userId}`}>
              <Button size="small" variant='outlined'>
                Appointment
              </Button>
            </Link>
            
            {/* beneficial reported or report her */}
            {details.isReported ? (
              <Typography sx={{ color: 'red'}}>Reported</Typography>
            ) : (

            currentUser.role === 'umujyanama wubuzima' && (
              <Button 
                size="small" 
                color="error" 
                variant='contained'
                onClick={handleOpen}
              >
                Report
              </Button>
            )
            )}
          </Box>
          </Grid>        
      </Paper>
    </Grid>
    
    {/* Guardians */}
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

          <Divider sx={{ width: '100%', my: 1 }} />
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
              {showAddGuardianForm ? (
                <Button
                  // type="submit"
                  size="small"
                  variant="outlined"
                  // sx={{ mt: 2, mb: 2, mr:4 }}
                  onClick={() => setShowAddGuardianForm(false)}
                >
                  Hide
              </Button>
              ): (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setShowAddGuardianForm(true)}
                >
                  + Add new guardian
              </Button>
              )}
            </Box>
          )}

          {showAddGuardianForm && 
            <AddGuardianForm 
              beneficialId={userId} 
              detailsLoading={detailsLoading} 
              setShowAddGuardianForm={setShowAddGuardianForm}
            />
          }
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

      { !showDonateForm && details?.guardians ? (
        <Paper
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
        >
          <List>
          {transactions?.map((record, index) => (
            <ListItem key={record?.id}>
              <ListItemText
                primary={`${record?.category.name}`}
                secondary={
                  <>
                    <div>{new Date(record?.createdAt).toLocaleDateString()}</div>
                  </>
                }
              />
              <Typography> +{record?.quantity} Pks</Typography>
            </ListItem>
          ))}
          </List>

          {/* Donate shishakibondo */}
          { currentUser.role === 'Nurse' && (
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                p: 2
              }}
            >
              {/* hinder donate to reported beneficial */}
              { !details.isReported && (
                    <Button
                    // type="submit"
                    size="small"
                    variant="outlined"
                    // sx={{ mt: 2, mb: 2, mr:4 }}
                    onClick={()=> setShowDonateForm(true)}
                    >
                      + Donate Now
                    </Button>
              )}
              
            </Box>
          )}
        </Paper>
      ): '' }

      {/* Form For Donating Product */}
      { showDonateForm && (
        <Box>
          <Paper
            sx={{
              mt: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
        <Box>
          <FormControl fullWidth>
            <InputLabel id="product-select">Product</InputLabel>
            <Select
              labelId="product-select"
              id="product-select"
              name="product"
              value={ productCatId }
              label="Product"
              onChange={handleProductChange}
            >
              { productsList?.map((product) =>(
                <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Input
            required
            fullWidth
            type= "number"
            id="quantity"
            label="Quantity"
            name="quantity"
            placeholder= "Quantity"
            sx={{
              border: 1,
              padding: 1,
              borderRadius: 2,
              mt: 2
            }}
            value={quantity}
            onChange={handleQuantityChange}
        />

        {loadingTakeup ? (
          <Button
              size="medium"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Submitting...
        </Button>
        ): (
        <Button
              // type="submit"
              size="medium"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={(event) => handleDonateSubmit(event)}
              disabled={!quantity || !productCatId || parseInt(quantity) === 0  } 
            >
              Submit
        </Button>
        )}
        
        {/* Show error message */}
        {/* {takeUpMessage && (
          <Typography>{takeUpMessage}</Typography>
        )} */}
          </Paper>
        </Box>
      )}
      
    </Grid>

    </Grid>
    </React.Fragment>
  );
}