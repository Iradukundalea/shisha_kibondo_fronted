import * as actionTypes from '../actionTypes'
import axios from 'axios';

const getStatisticsAction = ()=>{
    return async (dispatch) =>{
        const { data } = await axios.get('/statistics')
        if(data.users){
            dispatch({type: actionTypes.GET_STATISTICS, payload: data.users})
        }
    }
}

export {
    getStatisticsAction
}
