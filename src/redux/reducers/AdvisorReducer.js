import axios from 'axios';
import * as actionTypes from '../actionTypes'

const advisorState = {
    loading: false,
    advisors: [],
    message: '',
    error: ''
};

const advisorReducer = (state= advisorState, action)=>{
  switch (action.type) {
    case actionTypes.LIST_ADVISORS_REQUEST:
      return { ...state, loading: true}

    case actionTypes.LIST_ADVISORS_SUCCESS:
      const newAdvisorState = {
        loading: false,
        advisors: action.payload,
        message: '',
        error: ''
      }
      return newAdvisorState

      case actionTypes.SET_ADVISOR:
        return {
          ...state,
          loading: false,
          advisors: [...state.advisors, action.payload],
          message: '',
          error: ''
        };
        
      case actionTypes.ADD_ADVISOR_SUCCESS:
        // Return the current state or perform any additional actions on success
        return state;
      
      case actionTypes.ADD_ADVISOR_ERROR:
        // Handle the error case, you can show an error message or perform any other action
        console.log('Error adding advisor:', action.payload);
        return {...state, error: action.payload};
    default:
      return state
  }
}

export default advisorReducer;
