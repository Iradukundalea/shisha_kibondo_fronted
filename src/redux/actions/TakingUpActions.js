import * as actionTypes from '../actionTypes'
import axios from 'axios';

const getBeneficialTakingUpTransactions = (userId)=>{
    return async (dispatch) =>{
            dispatch({type: actionTypes.GET_TRANSACTIONS_REQUEST})
            const { data } = await axios.get(`/beneficials/${userId}/taking-up`)
            if(data.response){
                dispatch({type: actionTypes.GET_TRANSACTIONS_SUCCESS, payload: data.response})
            }  
    }
}

const donateToBeneficial = (productCategoryId, beneficialId, quantity, setShowDonateForm)=>{
    return async (dispatch) =>{
        try {
            dispatch({type: actionTypes.DONATE_REQUEST})
            const { data } = await axios.post(`/donate-product-to-beneficial/${productCategoryId}/${beneficialId}`, {quantity})
            console.log('Transactions', data)
            if(data.response){
                dispatch({type: actionTypes.DONATE_SUCCESS, payload: data.response})
                setShowDonateForm(false)
            }
            
        } catch (error) {
            dispatch({type: actionTypes.DONATE_STOCKOUT_MESSAGE, payload: error.response.data.message})
        }
            
    }
}

export {
    getBeneficialTakingUpTransactions,
    donateToBeneficial
}
