import axios from "axios";
import * as actionTypes from '../actionTypes'

const AuthActionType = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
};


const LoginAuthAction = (loginData, navigate) => {
  return (dispatch) => {
    dispatch({type: actionTypes.LOGIN_REQUEST})
    axios({
      method: 'POST',
      url: `/login`,
      data: {...loginData},
      validateStatus: () => true,
    }).then((resp)=> {

      if(resp.data.message){
        dispatch({type: actionTypes.LOGIN_FAIL, payload: resp.data.message})
      }

      if(resp.data.loginToken){
        dispatch({type: actionTypes.LOGIN_SUCCESS, payload: resp.data})

        navigate('/dashboard')
      }

    }).catch((error)=>{
      dispatch({type: actionTypes.LOGIN_FAIL, payload: error.message})
    })
  
  };
};

const loadUserFromLocalStorage = () => {
  return (dispatch) => {
    const storedUser = localStorage.getItem('auth');
    const user = JSON.parse(storedUser)
    if (user) {
      dispatch({type: actionTypes.LOGIN_SUCCESS, payload: user?.user})
    }
  };
};

const logout = (navigate)=>{
  return (dispatch)=>{
    dispatch({type: actionTypes.LOGOUT_SUCCESS})
    navigate('/')
  }
}

export {
  AuthActionType,
  LoginAuthAction,
  logout,
  loadUserFromLocalStorage
};
