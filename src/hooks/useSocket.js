import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import * as actionTypes from '../redux/actionTypes'

const backendBaseURL = 'http://localhost:5003'
// const { user } = JSON.parse(localStorage.getItem('auth'))

const socket = io(backendBaseURL, {
  transports: ['websocket'],
  // auth: {
  //   access_token: user?.loginToken,
  // },
});

const notificationSound = new Audio('/sounds/notification.mp3');
notificationSound.load()
// let playNotificationSound = true;

const useSocket = () => {
  const dispatch = useDispatch();
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  useEffect(() => {
    // const handlePlaySound = () => {
    //   if (isFirstInteraction) {
    //     setIsFirstInteraction(false);
    //     notificationSound.play();
    //   }
    // };

    socket.on('connect', () => {
      notificationSound.play()
      console.log('Socket Frontend Connected!')
    })

    socket.on('connect_error', (error) => {
      console.log('Error during connection', error)
    })

    socket.on('disconnect', () => {
      console.log('FE socket disconnected!')
    });

    socket.on('notification', (notification)=>{
      console.log('FFFFFRRRROOONTTTTTT NEEEEEEEEWWWWWWWW NNNOTTTTTT', notification)

      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: notification,
      });
      console.log('New Socket Notification', notification)
    })
  }, []);

  return { socket };
};
export default useSocket;
