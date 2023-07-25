import * as actionTypes from '../actionTypes'

const initialState = {
    stats: []
};

const statisticsReducer = (state= initialState, action)=>{
  switch (action.type) {
    case actionTypes.GET_STATISTICS:
      return { ...state, stats: action.payload}

    default:
      return state
  }
}

export default statisticsReducer;
