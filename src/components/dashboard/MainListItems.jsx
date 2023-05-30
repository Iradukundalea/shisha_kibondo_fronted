import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const MainListItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { user } = useSelector((state)=> state.authState)

  return (
    <React.Fragment>
    <Link to='/dashboard'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    {user?.user?.role === 'admin' ? (
    <Link to='/dashboard/advisors'>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Advisors" />
      </ListItemButton>
    </Link>
    ): ''}
    
    {user?.user?.role === 'admin' ? (
    <Link to='/dashboard/nurses'>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Nurses" />
      </ListItemButton>
    </Link>
    ): ''}

    <Link to='/dashboard/beneficials'>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Beneficials" />
      </ListItemButton>
    </Link>
    
    <Link to='/dashboard/orders'>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </Link>

    <Link to='/dashboard/deposits'>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Deposits" />
      </ListItemButton>
    </Link>

    <Link to='/dashboard/customers'>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
    </Link>
    
    <Link to='/dashboard/reports'>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </Link>
  </React.Fragment>
  );
};

export default MainListItems;
