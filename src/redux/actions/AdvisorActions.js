import * as actionTypes from '../actionTypes'
import axios from 'axios';
import { errorToast, successToast } from '../../utils/generateToast'

const getAdvisors = ()=>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.LIST_ADVISORS_REQUEST})
        const { data } = await axios.get('/list-advisors')

        dispatch({type: actionTypes.LIST_ADVISORS_SUCCESS, payload: data.response})

    }
}

const addNewAdvisor = (saveData, clearForm)=>{
    return async (dispatch) =>{
        try {
        const { data } = await axios.post('/signup/advisor', saveData)
        if(!data.success){
            dispatch({ type: actionTypes.ADD_ADVISOR_ERROR, payload: data?.message })
            // show toast
            errorToast(data?.message)

        }else{
            dispatch({type: actionTypes.SET_ADVISOR, payload: data?.data})
            
            // show toast
            successToast('Advisor saved successfully')
            
            //clean the form
            clearForm()
        }
            
        } catch (error) {
            dispatch({ type: actionTypes.ADD_ADVISOR_ERROR, payload: error?.response.data.error })
            //show toast
            errorToast(error?.response.data.error)
        }
    }
}

export {
    getAdvisors,
    addNewAdvisor
}
