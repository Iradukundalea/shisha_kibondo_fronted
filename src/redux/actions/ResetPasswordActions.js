import * as actionTypes from '../actionTypes'
import axios from 'axios';
import { successToast, errorToast } from '../../utils/generateToast'

const requestPasswordReset = (email)=>{
    return async (dispatch) =>{
        try{
            dispatch({type: actionTypes.PASSWORD_RESET_REQUEST})
            const { data } = await axios.post('/forgot-password', { email })
            console.log('Reset password', data)
            if(data.resetToken){
                successToast(`${data.message}, so check your Email!`)
                dispatch({ type: actionTypes.PASSWORD_RESET_EMAIL_SENT})
            }

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

const resetPassword =({token, password, confirmPassword}, navigate) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`/reset-password/${token}`, { 
                newPassword: password,
                confirmPassword: confirmPassword
             })
    
             if(data.success){
                successToast(data.message)
                navigate('/login', )
             }else{
                errorToast(data.message)
             }
        } catch(error){
            errorToast(error?.message)
        }
    }
}

export {
    requestPasswordReset,
    resetPassword
}
