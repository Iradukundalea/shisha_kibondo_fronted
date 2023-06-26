import axios from 'axios';
import * as actionTypes from '../actionTypes'

const userState = {
    loading: false,
    details: {},
    message: '',
    error: '',
    guardians: []
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

    case actionTypes.ADD_GUARDIAN_REQUEST:
      return { ...state, loading: true }

    case actionTypes.ADD_GUARDIAN_SUCCESS:
      return {
        ...state,
        loading: false,
        details: {...state.details, ...state.details.guardians.push(action.payload)},
      }
      
    
    default:
      return state
  }
}

export default userReducer;
