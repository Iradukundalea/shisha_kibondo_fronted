import * as actionTypes from '../actionTypes'

  const initialNotificationState = {
    notifications: [],
    unreadNotifications: 0,
  };
  
  export default function notificationReducer(
    state = initialNotificationState,
    action
  ) {

    switch (action.type) {
      case actionTypes.SET_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload,
          unreadNotifications: action.payload.filter(
            (notification) => notification.status == 'delivered'
          ).length,
        };
      case actionTypes.ADD_NOTIFICATION:
        return {
          ...state,
          notifications: [action.payload, ...state.notifications],
          unreadNotifications: state.unreadNotifications + 1,
        };

      case actionTypes.READ_NOTIFICATION:
        return {
          ...state,
          notifications: state.notifications.map((notification) => {
            if (notification.id == action.payload.id)
              return { ...notification, status: 'read' };
            return notification;
          }),
          // unreadNotifications: state.unreadNotifications - 1,
          unreadNotifications: state.unreadNotifications !== 0 ? state.unreadNotifications -1 : 0 
        };

    

    //   case DELETE_NOTIFICATION:
    //     const notificationToDelete = state.notifications.find(
    //       (notification) => notification.id === action.payload.id
    //     );
    //     return {
    //       ...state,
    //       notifications: state.notifications.filter(
    //         (notification) => notification.id !== action.payload.id
    //       ),
    //       unreadNotifications:
    //         notificationToDelete.status === 'read'
    //           ? state.unreadNotifications
    //           : state.unreadNotifications - 1,
    //     };
      case actionTypes.READ_ALL_NOTIFICATIONS:
        return {
          ...state,
          notifications: state.notifications.map((notification) => {
            return { ...notification, status: 'read' };
          }),
          unreadNotifications: 0,
        };
      default:
        return state;
    }
  }
  