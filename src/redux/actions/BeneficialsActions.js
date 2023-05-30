import * as actionTypes from '../actionTypes'
import axios from 'axios';

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
        console.log('Beneficials', data)
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

            console.log('BODY DATA', bodyData);
            const { data } = await axios.post('/addBeneficial', bodyData);
            
            if(data){
                dispatch({type: actionTypes.ADD_BENEFICIAL_SUCCESS, payload: data})

                hideForm()
            }
            
        } catch (error) {
            dispatch({type: actionTypes.ADD_BENEFICIAL_ERROR, payload: error?.response?.data?.message})
            
        }
        
    }
}
export {
    getBeneficials,
    addNewBeneficial
}
