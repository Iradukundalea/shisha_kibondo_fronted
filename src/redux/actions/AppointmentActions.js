import * as actionTypes from '../actionTypes'
import axios from 'axios';
import { errorToast, successToast } from '../../utils/generateToast'

const getAppointments = ()=>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.LIST_APPOINTMENTS_REQUEST})
        const { data } = await axios.get('/appointments')

        dispatch({type: actionTypes.LIST_APPOINTMENTS_SUCCESS, payload: data.response})

    }
}

const getBeneficialAppointments = (beneficialId) => {
    return async (dispatch) =>{
        dispatch({ type: actionTypes.GET_BENEFICIAL_APPOINTMENTS_REQUEST})

        dispatch({ type: actionTypes.SET_SELECTED_BENEFICIAL_APPOINTMENTS})

        const { data } = await axios.get(`/appointments/${beneficialId}/list`)
        if(data?.response) {
            dispatch({type: actionTypes.GET_BENEFICIAL_APPOINTMENTS_SUCCESS, payload: data.response})
        }
    }
}

const setBeneficialAppointment = (beneficialId, appointmentDate, setshowCalendar) => {
    return async (dispatch) =>{
        try {
            const { data } = await axios.post(`/appointments/${beneficialId}/create`, { appointmentDate })

            if(data?.response) {
                // re-list updated beneficial appointment table
                await dispatch(getBeneficialAppointments(beneficialId))

                // hide calendar
                setshowCalendar(false)

                //show toast
                successToast('Appointment set successfully')
            }

        }catch(error){
            errorToast(error?.response?.data?.message)
        }
    }
}

const changeAppointmentStatus = (appointmentId, newStatus) => {
    return async (dispatch) =>{
        try{
            const { data } = await axios.put(`/appointments/${appointmentId}/change-status`, { status: newStatus})
            if(data?.response) {
                dispatch({type: actionTypes.CHANGE_APPOINTMENT_STATUS, payload: data.response})
                // show toast
                successToast('Appointment status updated successfully!')
            }
        } catch(error){
            errorToast(error?.response?.data?.message)
        }
        
    }
}

export {
    getAppointments,
    getBeneficialAppointments,
    setBeneficialAppointment,
    changeAppointmentStatus
}
