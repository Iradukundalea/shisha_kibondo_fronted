import * as actionTypes from '../actionTypes'
import axios from 'axios';

const listProductsAction = (userId)=>{
    return async (dispatch) =>{
            dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
            const { data } = await axios.get(`/products/list-category`)
            console.log('pRODUCT', data)
            if(data.response){
                dispatch({type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data.response})
            }  
    }
}

export {
    listProductsAction,
}
