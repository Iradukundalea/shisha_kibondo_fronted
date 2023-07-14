import * as actionTypes from '../actionTypes'
import axios from 'axios';
import { successToast, errorToast } from '../../utils/generateToast'

const getBeneficials = ()=>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.LIST_BENEFICIALS_REQUEST})
        const { data } = await axios.get('/getBeneficials')
        if(data.message){
            dispatch({type: actionTypes.LIST_BENEFICIALS_SUCCESS_NOT_FOUND, payload: data.message})
        }
        if(data.response){
            dispatch({type: actionTypes.LIST_BENEFICIALS_SUCCESS, payload: data.response})
        }
    }
}

const getBeneficialsInMyRegion = ()=>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.LIST_BENEFICIALS_REQUEST})
        const { data } = await axios.get('/getBeneficials/my-region')
        if(data.message){
            dispatch({type: actionTypes.LIST_BENEFICIALS_SUCCESS_NOT_FOUND, payload: data.message})
        }
        if(data.response){
            dispatch({type: actionTypes.LIST_BENEFICIALS_SUCCESS, payload: data.response})
        }
    }
}

const addNewBeneficial = (beneficialData, hideForm) => {
    return async (dispatch) =>{
        try {
            dispatch({type: actionTypes.ADD_BENEFICIAL_REQUEST})
            const bodyData = {
                identityNumber: beneficialData.beneficialIdentityNumber,
                firstName: beneficialData.beneficialFirstName,
                lastName: beneficialData.beneficialLastName,
                telephone: beneficialData.beneficialTelephone,
                sex: beneficialData.beneficialSex,
                status: beneficialData.status,
                healthCenter: beneficialData.healthCenter,
                province: beneficialData.province,
                district: beneficialData.district,
                sector: beneficialData.sector,
                cell: beneficialData.cell,
                village: beneficialData.village,
                nurseId: beneficialData.nurseId
            }

            const { data } = await axios.post('/addBeneficial', bodyData);
            
            if(data){
                dispatch({type: actionTypes.ADD_BENEFICIAL_SUCCESS, payload: data})
                // hide a form
                hideForm()
                // show a toast
                successToast('Beneficiary added successfully.')
            }
            
        } catch (error) {
            dispatch({type: actionTypes.ADD_BENEFICIAL_ERROR, payload: error?.response?.data?.message})
            errorToast(error?.response?.data?.message)
        }
    }
}

const reportBeneficiaryAction = (beneficialId, closeModal) =>{
    return async (dispatch) =>{
        try{
            const { data } = await axios.put(`/beneficials/${beneficialId}/report-use-abuse`)
            if(data.response.isReported){
                dispatch({ type: actionTypes.REPORT_BENEFICIAL_USE_ABUSE_SUCCESS, payload: data.response})
                
                closeModal()

                // show a toast
                successToast('Beneficiary reported successfully!')
            }
        }catch(error){
            errorToast(error)
        }
    }
}
export {
    getBeneficials,
    addNewBeneficial,
    getBeneficialsInMyRegion,
    reportBeneficiaryAction
}
