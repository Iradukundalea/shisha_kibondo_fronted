import * as actionTypes from '../actionTypes'

const initialState = {
    loading: false,
    results: {},
    message: '',
}

const ubudeheReducer = (state=initialState, {type, payload})=>{
    switch (type){
        case actionTypes.CHECK_UBUDEHE_REQUEST:
            return { ...state, message: '', results: {}, loading: true }

        case actionTypes.CHECK_UBUDEHE_SUCCESS_NOT_FOUND:
            return { 
                ...state, 
                message: payload, 
                loading: false,
                results: {}
            }

        case actionTypes.CHECK_UBUDEHE_SUCCESS:
            const newState = {
                ...state,
                message: '',
                loading: false,
                results: payload
            }
            return newState

        default:
            return initialState
    }
}

export default ubudeheReducer