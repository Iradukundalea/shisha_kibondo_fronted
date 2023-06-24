import * as actionTypes from '../actionTypes'
import axios from 'axios';

const fetchNotifications = ()=>{
    return async (dispatch) =>{
        const { data } = await axios.get('/notifications')
        console.log('List of notifications', data)
        dispatch({ type: actionTypes.SET_NOTIFICATIONS, payload: data.response })
    }
}

const readNotification = (notificationId) => async (dispatch) => {
    const { status, data } = await axios.patch(
      `/notifications/${notificationId}/read`
    );
    
    if (status === 200) {
      dispatch({
        type: actionTypes.READ_NOTIFICATION,
        payload: data.response,
      });
    }
};

const readAllNotifications = () => async (dispatch) => {
    const response = await axios.patch('/notifications/read-all');
    if ((response.status = 200)) {
      dispatch({
        type: actionTypes.READ_ALL_NOTIFICATIONS,
      });
    }
};


export {
    fetchNotifications,
    readNotification,
    readAllNotifications
}
