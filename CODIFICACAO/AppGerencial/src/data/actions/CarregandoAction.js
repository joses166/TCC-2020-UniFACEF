export const LOADING = 'LOADING'

export const loading = () => {
    return dispatch => {
        dispatch({
            type: LOADING,
            data: true
        })
    }
}

export const notLoading = () => {
    return dispatch => {
        dispatch({
            type: LOADING,
            data: false
        })
    }
}