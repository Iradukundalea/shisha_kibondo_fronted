import * as actionTypes from '../actionTypes'

const stockinState = {
    loading: false,
    isProductQuantityUpdated: false,
};

const stockInReducer = (state= stockinState, action)=>{
  switch (action.type) {
    case actionTypes.STOCKIN_REQUEST:
      return { ...state, loading: true, isProductQuantityUpdated: false}

    case actionTypes.STOCKIN_SUCCESS:
    return { ...state, loading: false, isProductQuantityUpdated: true} 

    default:
      return state
  }
}

export default stockInReducer;
