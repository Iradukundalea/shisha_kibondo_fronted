import * as React from 'react';
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
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems, thirdListItems } from './listItems';
import Chart from './Chart';
import Orders from './Orders';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import { getAdvisors } from '../../redux/actions/AdvisorActions'
import Loading from './Loading'
import AddAdvisor from './AddAdvisor'
import { formattedTimestamp } from '../../utils/formatTime';
import Input from '@mui/material/Input';
import { getProductCategoryDetails } from '../../redux/actions/ProductActions';
import { Link, useParams } from 'react-router-dom'
import { TextField } from '@mui/material';
import { addProductQuantityInStock } from '../../redux/actions/StockActions'
import {getCurrentUser} from '../../utils/getCurrentUser'


function preventDefault(event) {
  event.preventDefault();
}

export default function Advisor() {
  const { productCategoryId } = useParams()
  const dispatch = useDispatch()
  const [showAddProductQuantityForm, setShowAddProductQuantityForm] = React.useState(false)
  const [quantity, setQuantity] = React.useState('')
  const [expirationDate, setExpirationDate] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState('')

  const { productCategory, loading, isProductQuantityUpdated } = useSelector(
    ({
      productState: { productCategory },
      stock: { loading, isProductQuantityUpdated}
    }) => ({
        productCategory,
        loading,
        isProductQuantityUpdated
    })
  );

  React.useEffect(()=>{
    setCurrentUser(getCurrentUser())

    dispatch(getProductCategoryDetails(productCategoryId))

    if(isProductQuantityUpdated){
      isShowAddProductQuantityForm(false)
    }
  },[isProductQuantityUpdated])

  const clearAddProductQuantityForm = ()=>{
    setQuantity('')
    setExpirationDate('')
  }

  const isShowAddProductQuantityForm =(value)=>{
    if(value){
      clearAddProductQuantityForm()
    }
    setShowAddProductQuantityForm(value)
  }

  const handleAddProductQuantity = (event)=>{
    preventDefault(event)
    const data = {
      productCategoryId,
      quantity,
      expirationDate
    }
    dispatch(addProductQuantityInStock(data))
  }

  return (
    <>
    { currentUser.role === 'Nurse' && (
      <Button
        type="submit"
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => isShowAddProductQuantityForm(true)}
          >
            + Add {productCategory?.name}
      </Button>
    )}
    
    <Grid container spacing={3}>
    
      {/* Product category Table transactions */}
      <Grid item xs={12} md={12} lg={ showAddProductQuantityForm ? 9 : 12}>
      <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              // height: 240,
            }}
          > 
              <Table size="small" padding="checkbox">
              <TableHead>
                  <TableRow>
                  <TableCell sx={{ fontWeight: 'bold'}}>PRODUCT NAME</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>BENEFICIAL</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>TYPE</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>QUANTITY</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>EXPIRATION DATE</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {productCategory?.transactions?.map((transaction, index)=>(
                      <>
                      <TableRow key={index}>
                          <TableCell>{productCategory.name}</TableCell>
                          <TableCell>
                              {transaction?.beneficial?
                                  (
                                      <Link 
                                          style={{ textDecoration: 'underline'}}
                                          to={`/dashboard/users/${transaction?.beneficial?.id}`}
                                      >
                                          {transaction?.beneficial?.firstName} {transaction?.beneficial?.lastName}
                                      </Link>
                                  )
                                  : 
                                  '-'
                              }
                          </TableCell>
                          <TableCell>
                              { transaction?.beneficial?.firstName? 
                                  'STOCKOUT' : 'STOCKIN'
                              }
                          </TableCell>
                          <TableCell>{transaction.quantity}</TableCell>
                          <TableCell>
                              { transaction?.expirationDate? 
                                  new Date(transaction?.expirationDate).toLocaleDateString() 
                                  : '-'
                              }
                          </TableCell>
                      </TableRow>
                      </>
                  ))}
              </TableBody>
              </Table>
        </Paper>
      </Grid>
      
      {/* Add new product quantities in Stock */}
      {showAddProductQuantityForm && (
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            // height: 240,
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'right',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            <span onClick={()=> isShowAddProductQuantityForm(false)}>x</span>
          </div>
          <Box component="form" onSubmit={handleAddProductQuantity} >
            <TextField
              sx={{ mb: 2}}
              id="quantity" 
              label="Quantity" 
              variant='outlined'
              name="quantity"
              type="number"
              fullWidth
              focused
              value={quantity}
              onChange={(event)=> setQuantity(event.target.value)}
            />

            <TextField
              id="expiration-date" 
              label="Expiration Date" 
              variant='outlined'
              name="expiration-date"
              type="date"
              fullWidth
              focused
              value={expirationDate}
              onChange={(event)=> setExpirationDate(event.target.value)}
              inputProps={{
                min: new Date().toISOString().split('T')[0] // Set min date to today
              }}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!quantity.length || quantity <= 0 || !expirationDate.length}
                sx={{ mt: 2, mb: 0 }}
              >
                Add
            </Button>
          </Box>
          
        </Paper>
      </Grid>
      )}

    </Grid>
    <Copyright sx={{ pt: 4 }} />
    </>
  );
}
