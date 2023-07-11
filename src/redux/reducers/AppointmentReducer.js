import * as actionTypes from '../actionTypes'

const appointmentState = {
    loading: false,
    appointments: [],
    message: '',
    error: '',
    list_appointments: [],
};

const appointmentReducer = (state= appointmentState, action)=>{
  switch (action.type) {
    case actionTypes.LIST_APPOINTMENTS_REQUEST || actionTypes.GET_BENEFICIAL_APPOINTMENTS_REQUEST:
      return { ...state, loading: true }

    case actionTypes.LIST_APPOINTMENTS_SUCCESS:
      return {
        ...appointmentState,
        loading: false,
        appointments: action.payload,
        message: '',
        error: ''
      }

      case actionTypes.GET_BENEFICIAL_APPOINTMENTS_SUCCESS:
        return {
          ...appointmentState,
          loading: false,
          list_appointments: action.payload,
        }

        case actionTypes.SET_SELECTED_BENEFICIAL_APPOINTMENTS:
          return {
            ...appointmentState,
            list_appointments: [], // Clear the list_appointments array
          };
    default:
      return state
  }
}

export default appointmentReducer;
