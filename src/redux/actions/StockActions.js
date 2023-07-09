import * as actionTypes from '../actionTypes'
import axios from 'axios';
import { successToast, errorToast } from '../../utils/generateToast'

const addProductQuantityInStock = ({ productCategoryId, quantity, expirationDate })=>{
    return async (dispatch) =>{
        try{
            dispatch({type: actionTypes.STOCKIN_REQUEST})
            const { data } = await axios.post(`/products/${productCategoryId}/add-product`,{
                quantity,
                expirationDate
            })

            if(data.id){
                dispatch({type: actionTypes.STOCKIN_SUCCESS, payload: data})
                successToast(`${quantity} Quantit${quantity > 1 ? 'ies' : 'y'} added successfully`)
            }
        } catch(error){
            errorToast(error?.message)
        }
    }
}

export {
    addProductQuantityInStock,
}
