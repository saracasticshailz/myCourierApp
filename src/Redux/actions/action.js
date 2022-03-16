import store from "../store";


const { dispatch } = store;

export const saveUserData = (data) => {
    dispatch({
        type: 'SAVE_DATA',
        payload: data
    })
}