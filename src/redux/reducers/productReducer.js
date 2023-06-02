import axios from 'axios';
import * as actionTypes from '../actionTypes'

const productState = {
    loading: false,
    list: [],
    message: '',
    error: ''
};

const productReducer = (state= productState, action)=>{
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true}

    case actionTypes.GET_PRODUCTS_SUCCESS:
    const newState = {
        loading: false,
        list: action.payload,
        message: '',
        error: ''
    }
    return newState 

    default:
      return state
  }
}

export default productReducer;
