import axios from 'axios';
import * as actionTypes from '../actionTypes'

const userState = {
    loading: false,
    details: {},
    message: '',
    error: ''
};

const userReducer = (state= userState, action)=>{
  switch (action.type) {
    case actionTypes.GET_DETAILS_REQUEST:
      return { ...state, loading: true}

    case actionTypes.GET_DETAILS_SUCCESS:
    const newState = {
        loading: false,
        details: action.payload,
        message: '',
        error: ''
    }
    return newState 

    default:
      return state
  }
}

export default userReducer;
