import * as actionTypes from '../actionTypes'
import axios from 'axios';

/**
 * 
 * @param {string} IDNUMBER Identification number of the head of the family
 * @returns { object } Information about the family (ubudehe category, spouse, children)
 */
const checkUbudeheCategoryAction = (IDNUMBER)=>{
    const ubudeheBaseUrl = 'https://nida-simulation.onrender.com/1198780567898067'

    return async (dispatch) =>{
        dispatch({type: actionTypes.CHECK_UBUDEHE_REQUEST})
        try {
            const { data } = await axios.get(`https://nida-simulation.onrender.com/people/${IDNUMBER}/find`)
        if(data.response){
            dispatch({type: actionTypes.CHECK_UBUDEHE_SUCCESS, payload: data.response})
        }
            
        } catch (error) {
            dispatch({type: actionTypes.CHECK_UBUDEHE_SUCCESS_NOT_FOUND, payload: error?.response?.data?.message})
        }
        
    }
}

export {
    checkUbudeheCategoryAction,
}
