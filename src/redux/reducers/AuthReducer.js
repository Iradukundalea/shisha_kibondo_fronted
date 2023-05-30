import axios from 'axios';
import * as actionTypes from '../actionTypes'

const authState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: ''
};

const authReducer = (state= authState, action)=>{
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, loading: true}

    case actionTypes.LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload}

    case actionTypes.LOGIN_SUCCESS:
      const newAuthState = {
        isLoggedIn:true,
        loading: false,
        error: '',
        user: action.payload
      }

      localStorage.setItem("auth", JSON.stringify(newAuthState));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.loginToken}`;
      return newAuthState

    case actionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("auth");
      return { ...authState }

    default:
      return state
  }
}

export default authReducer;
