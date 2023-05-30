import axios from 'axios';
import * as actionTypes from '../actionTypes'

const nurseState = {
    loading: false,
    nurses: [],
    message: '',
    error: ''
};

const nurseReducer = (state= nurseState, action)=>{
  switch (action.type) {
    case actionTypes.LIST_NURSES_REQUEST:
      return { ...state, loading: true}

    case actionTypes.LIST_NURSES_SUCCESS_NOT_FOUND:
      const newNurseState = {
        ...nurseState,
        message: action.payload,
      }
      return newNurseState
    
    case actionTypes.LIST_NURSES_SUCCESS:
    const newState = {
        loading: false,
        nurses: action.payload,
        message: '',
        error: ''
    }
    return newState 

    case actionTypes.SET_NURSE:
    return {
        ...state,
        loading: false,
        nurses: [...state.nurses, action.payload],
        message: '',
        error: ''
    };
      
    case actionTypes.ADD_NURSE_ERROR:
    // Handle the error case, you can show an error message or perform any other action
    console.log('Error adding nurse:', action.payload);
    return {...state, error: action.payload};
    default:
      return state
  }
}

export default nurseReducer;
