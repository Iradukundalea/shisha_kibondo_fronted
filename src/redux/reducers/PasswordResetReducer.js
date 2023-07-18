import * as actionTypes from '../actionTypes'

const passwordResetState = {
    loading: false,
    message: '',
    error: ''
};

const passwordReducer = (state= passwordResetState, action)=>{
  switch (action.type) {
    case actionTypes.PASSWORD_RESET_REQUEST:
      return { ...state, loading: true}

    case actionTypes.PASSWORD_RESET_ERROR: 
    return { 
      ...state, 
      error: action.payload, 
      loading: false 
    }

    case actionTypes.PASSWORD_RESET_EMAIL_SENT:
      return { 
        ...state, 
        loading: false 
      }
    
    default:
      return state
  }
}

export default passwordReducer;
