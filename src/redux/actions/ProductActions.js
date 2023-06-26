import * as actionTypes from '../actionTypes'
import axios from 'axios';

const listProductsAction = ()=>{
    return async (dispatch) =>{
            dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})
            const { data } = await axios.get(`/products/list-category`)
            if(data.response){
                dispatch({type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data.response})
            }  
    }
}

const getProductCategoryDetails = (productCategoryId)=>{
    return async (dispatch) => {
        const { data } = await axios.get(`/products/${productCategoryId}`)
        console.log('ProductCategory', data)
        if(data.response){
            dispatch({type: actionTypes.PRODUCT_CATEGORY_DETAILS, payload: data.response})
        }  
    }
}

export {
    listProductsAction,
    getProductCategoryDetails
}
