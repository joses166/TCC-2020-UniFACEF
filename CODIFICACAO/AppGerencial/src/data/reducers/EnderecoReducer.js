import * as EnderecoConstants from '../actions/EnderecoAction'

initialState = {
    endereco: {}
}

const EnderecoReducer = (state = initialState, action) => {
    switch (action.type) {
        case EnderecoConstants.GET_ENDERECO:
            return {
                ...state,
                endereco: action.endereco
            }
        default:
            return state
    }
}

export default EnderecoReducer