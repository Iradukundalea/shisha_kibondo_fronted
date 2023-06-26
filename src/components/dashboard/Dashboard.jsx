import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import TrendingFlatSharpIcon from '@mui/icons-material/TrendingFlatSharp';
import { listProductsAction } from '../../redux/actions/ProductActions';
import { Link } from 'react-router-dom';
import {getCurrentUser} from '../../utils/getCurrentUser'
import { 
  getBeneficials, 
  getBeneficialsInMyRegion 
} from '../../redux/actions/BeneficialsActions';


function preventDefault(event) {
  event.preventDefault();
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = React.useState('')

  const { list: productList, user, beneficials } = useSelector(
    ({
      authState: { user },
      productState: { list },
      beneficialState: { beneficials }
    }) => ({
      user,
      list,
      beneficials
    })
  );

  React.useEffect(()=>{
    setCurrentUser(getCurrentUser())
    if(currentUser.role === 'umujyanama wubuzima'){
      dispatch(getBeneficialsInMyRegion())
    }
    else{
      dispatch(getBeneficials())
    }

    dispatch(listProductsAction())
  }, [currentUser.role])

  return (
    <>
    <Grid container spacing={3}>
    { currentUser.role !== 'umujyanama wubuzima' && productList?.map((product)=> (
      <>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // height: 240,
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', px: 2, py:1 }}
            >
              {product.name}
            </Typography>
            <Typography
              sx={{ fontWeight: 'bold', fontSize: 25, px: 2, py: 1 }}
            >
              {product.totalQuantity}
            </Typography>
            <Typography
              sx={{ backgroundColor: 'rgba(0,0,0,.1)', textAlign: 'center' }}
            >
              <Link to={`/dashboard/stocks/${product.id}`}>
                More info
                <TrendingFlatSharpIcon />
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </>
    ))}
    
    <Grid item xs={12} md={6} lg={6}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // height: 240,
        }}
      >
        <Typography
          sx={{ fontWeight: 'bold', px: 2, py:1 }}
        >
          Beneficials
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', fontSize: 25, px: 2, py: 1 }}
        >
          {beneficials.length}
        </Typography>
        <Typography
          sx={{ backgroundColor: 'rgba(0,0,0,.1)', textAlign: 'center' }}
        >
          <Link to={`/dashboard/beneficials`}>
            More info
            <TrendingFlatSharpIcon />
          </Link>
          
        </Typography>
      </Paper>
    </Grid>

    <Grid item xs={12} md={12} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 240,
        }}
      >
        <pre>
          {JSON.stringify(user?.user, null, 2)}
        </pre>
      </Paper>
    </Grid>
    </Grid>
    <Copyright sx={{ pt: 4 }} />
    </>
    
  );
}