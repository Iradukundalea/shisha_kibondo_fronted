import * as actionTypes from '../actionTypes'
import axios from 'axios';
import { successToast, errorToast } from '../../utils/generateToast';

const getUserDetails = (userId)=>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.GET_DETAILS_REQUEST})
        const { data } = await axios.get(`/beneficials/${userId}`)
        if(data.response){
            dispatch({type: actionTypes.GET_DETAILS_SUCCESS, payload: data.response})
        }  
    }
}

const addGuardianAction = (userId, guardianData, clearForm)=>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.ADD_GUARDIAN_REQUEST})

        const bodyData = {
            identityNumber: guardianData.guardianIdentityNumber,
            firstName: guardianData.guardianFirstName,
            lastName: guardianData.guardianLastName,
            telephone: guardianData.guardianTelephone,
            sex: guardianData.guardianSex,
            province: guardianData.province,
            district: guardianData.district,
            sector: guardianData.sector,
            cell: guardianData.cell,
            village: guardianData.village
        }

        const { data } = await axios.post(`/beneficials/${userId}/addGuardian`, bodyData)
        if(data){
            dispatch({type: actionTypes.ADD_GUARDIAN_SUCCESS, payload: data})
            // clean a form
            clearForm()

            // show a toast
            successToast('Guardian added successfully.')
        }  
    }
}

export {
    getUserDetails,
    addGuardianAction
}
