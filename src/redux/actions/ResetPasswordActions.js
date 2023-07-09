import * as actionTypes from '../actionTypes'
import axios from 'axios';
import { successToast, errorToast } from '../../utils/generateToast'

const requestPasswordReset = (email)=>{
    return async (dispatch) =>{
        try{
            dispatch({type: actionTypes.PASSWORD_RESET_REQUEST})
            const { data } = await axios.post('/forgot-password', { email })
            console.log('Reset password', data?.message)
        } catch(error){
            dispatch({
                type: actionTypes.PASSWORD_RESET_ERROR, 
                payload: error?.response?.data?.message
            })
            // show error toast
            errorToast(error?.response?.data?.message ? error?.response?.data?.message : `${error?.message}`)
            console.log('err', error)
        }
        

        // dispatch({type: actionTypes.LIST_ADVISORS_SUCCESS, payload: data.response})

    }
}

export {
    requestPasswordReset,
}
