import * as actionTypes from '../actionTypes'
import axios from 'axios';

const getUserDetails = (userId)=>{
    return async (dispatch) =>{
            dispatch({type: actionTypes.GET_DETAILS_REQUEST})
            const { data } = await axios.get(`/beneficials/${userId}`)
            console.log('DDDDDDDD', data)
            if(data.response){
                dispatch({type: actionTypes.GET_DETAILS_SUCCESS, payload: data.response})
            }  
    }
}

export {
    getUserDetails,
    // addNewAdvisor
}
