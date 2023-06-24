import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Delete, DoneAll } from '@mui/icons-material'
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {
  Box,
  Avatar,
  Button,
  Menu,
  CardContent,
  Typography,
  Card,
  Stack,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { readNotification, readAllNotifications } from '../redux/actions/NotificationsActions'
import moment from 'moment'

const NotificationBadge = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setIsOpen(true);
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setIsOpen(false);
    };

    const { notifications, unreadNotifications } = useSelector((state) => state.notifications)
    
    const dispatch = useDispatch()

    const handleReadNotification = (notification) =>{
      dispatch(readNotification(notification.id))
    }

    const handleReadAllNotifications = () => {
      dispatch(readAllNotifications())
    }

    return (
      <>
        <IconButton color="inherit" onClick={handleClick}>
          <Badge badgeContent={unreadNotifications} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {notifications.length ? (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: '10px', borderBottom: '1px solid rgba(0,0,0,0.2)' }}
              // style={{ minWidth: '400px', maxWidth: '400px' }}
            >
          <Box style={{ maxWidth: '100%', width: '100%' }}>
            <Typography sx={{ display: 'inline' }} variant="h5">
              Notification
            </Typography>
          </Box>
          <Box>
            <IconButton size="sm" onClick={handleReadAllNotifications}>
              <DoneAll />
            </IconButton>
          </Box>
        </Stack>

        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index}>
              <Card
                style={{
                  background: 
                    notification.status !== 'read' ? 'rgba(0,0,0,0.2)' : undefined,
                  width: '100%',
                  // padding: '10px',
                  maxWidth: '400px',
                }}
                onClick={() => handleReadNotification(notification)}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box sx={{ p: '5px' }}>
                      <Avatar />
                    </Box>
                    <Box>
                    <Typography variant="h6">
                      {notification.title}.
                    </Typography>
                    <Typography>
                      {notification.message}.
                    </Typography>
                      <small>
                        {moment(notification.createdAt).fromNow()}
                      </small>
                    </Box>
                    <Box sx={{ p: '5px' }}>
                      <Button
                        variant="error"
                        style={{ width: '100%' }}
                      >
                        <Delete />
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
        </>
          ): (
          <List>
            <ListItem>No notifications to show!</ListItem>
            </List>
          )}
        </Popover>
      </>
    );
  };
export default NotificationBadge
