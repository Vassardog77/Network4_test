import * as api from '../api'

export const sendNotification = (config) => async (dispatch) => {
    try {
        const data = await api.sendNotification(config) //comes from api index.js 
        dispatch({ type: 'SEND_NOTIFICATION', payload: data }) 
    } catch (error) {
        console.log(error)
    }
}

export const deleteNotification = (config) => async (dispatch) => {
    try {
        const data = await api.deleteNotification(config) //comes from api index.js 
        dispatch({ type: 'DELETE_NOTIFICATION', payload: data }) 
    } catch (error) {
        console.log(error)
    }
}