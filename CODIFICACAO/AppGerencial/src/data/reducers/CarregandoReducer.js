import * as CarregandoConstants from '../actions/CarregandoAction'

initialState = {
    loading: false
}

const CarregandoReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case CarregandoConstants.LOADING:
            return {
                ...state,
                loading: action.data
            }
        default: 
            return state
    }
}

export default CarregandoReducer