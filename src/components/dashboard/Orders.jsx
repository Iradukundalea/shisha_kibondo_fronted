import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAdvisors } from '../../redux/actions/AdvisorActions'
import Typography from '@mui/material/Typography';
import Loading from './Loading'
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

export default function Orders() {
  const [currentUser, setCurrentUser] = React.useState('')

  const { advisors, loading } = useSelector((state)=> state.advisorState)

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

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAdvisors())
  },[])

  React.useEffect(()=>{
    setCurrentUser(getCurrentUser())
    if(currentUser.role === 'umujyanama wubuzima'){
      dispatch(getBeneficialsInMyRegion())
    }
    else{
      dispatch(getBeneficials())
    }

    dispatch(listProductsAction())
  }, [currentUser?.role])

  console.log('CCCCCCCCCCCCCcc', loading)

  return (
    <React.Fragment>
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
        
        {/* <Grid item xs={12} md={6} lg={6}>
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
                 Beneficiaries
                </Typography>
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: 25, px: 2, py: 1 }}
                >
                  2
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
        </Grid> */}
      
      </Grid>

      {/* <Paper>
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
      </Paper> */}

    </React.Fragment>
  );
}