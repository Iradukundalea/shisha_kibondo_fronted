import axios from 'axios';
import * as actionTypes from '../actionTypes'

const beneficialState = {
    loading: false,
    beneficials: [],
    message: '',
    error: ''
};

const beneficialReducer = (state= beneficialState, action)=>{
  switch (action.type) {
    case actionTypes.LIST_BENEFICIALS_REQUEST:
      return { ...state, loading: true}

    case actionTypes.LIST_BENEFICIALS_SUCCESS_NOT_FOUND:
      const newBeneficialState = {
        ...beneficialState,
        message: action.payload,
      }
      return newBeneficialState
    
    case actionTypes.LIST_BENEFICIALS_SUCCESS:
    const newState = {
        loading: false,
        beneficials: action.payload,
        message: '',
        error: ''
    }
    return newState 

    case actionTypes.ADD_BENEFICIAL_REQUEST:
      return { ...state, loading: true, message: '' }

    case actionTypes.ADD_BENEFICIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        beneficials: [...state.beneficials, action.payload],
        message: '',
        error: ''
      };
    case actionTypes.ADD_BENEFICIAL_ERROR:
      return { ...state, loading: false, error: action.payload}
    default:
      return state
  }
}

export default beneficialReducer;
