import axios from 'axios';
import * as actionTypes from '../actionTypes'

const takeUpState = {
    loading: false,
    transactions: [],
    message: '',
    error: ''
};

const takeUpReducer = (state= takeUpState, action)=>{
  switch (action.type) {
    case actionTypes.GET_TRANSACTIONS_REQUEST:
      return { ...state, loading: true}

    case actionTypes.GET_TRANSACTIONS_SUCCESS:
    const newState = {
        loading: false,
        transactions: action.payload,
        message: '',
        error: ''
    }
    return newState 

    case actionTypes.DONATE_REQUEST:
        return { ...state, loading: true}

    case actionTypes.DONATE_SUCCESS:
        const newTakeUpState = {
            loading: false,
            transactions: [...state.transactions, action.payload],
            message: '',
            error: ''
        }
        return newTakeUpState

    case actionTypes.DONATE_STOCKOUT_MESSAGE:
        return { 
            ...state, 
            loading: false, 
            message: action.payload 
        } 

    default:
      return state
  }
}

export default takeUpReducer;
