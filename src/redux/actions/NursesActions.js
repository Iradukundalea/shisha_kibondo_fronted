import * as actionTypes from '../actionTypes'
import axios from 'axios';

const getNurses = ()=>{
    return async (dispatch) =>{
        dispatch({type: actionTypes.LIST_NURSES_REQUEST})
        const { data } = await axios.get('/list-nurses')
        if(data.message){
            dispatch({type: actionTypes.LIST_NURSES_SUCCESS_NOT_FOUND, payload: data.message})
        }
        if(data.response){
            dispatch({type: actionTypes.LIST_NURSES_SUCCESS, payload: data.response})
        }
    }
}

const addNewNurse = (saveData, clearForm)=>{
    return async (dispatch) =>{
        try {
        const { data } = await axios.post('/signup/nurse', saveData)

        if(!data.success){
            dispatch({ type: actionTypes.ADD_NURSE_ERROR, payload: data?.message })

        }else{
            dispatch({type: actionTypes.SET_NURSE, payload: data?.data})
            clearForm()
        }
            
        } catch (error) {
            dispatch({ type: actionTypes.ADD_NURSE_ERROR, payload: error?.response.data.error })
        }
    }
}

export {
    getNurses,
    addNewNurse
}
