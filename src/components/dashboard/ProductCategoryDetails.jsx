import * as React from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import { getProductCategoryDetails } from '../../redux/actions/ProductActions';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'

export default function ProductCategoryDetails() {
  const { productCategoryId } = useParams()
  const { productCategory } = useSelector(
    ({
      productState: { productCategory },
    }) => ({
        productCategory,
    })
  );

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProductCategoryDetails(productCategoryId))
  },[])

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
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
    </Grid>

    <Copyright sx={{ pt: 4 }} />
    </>
    
  );
}