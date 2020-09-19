import * as UsuarioConstants from '../actions/UsuarioAction'

initialState = {
    infoUsuario: {},
    usuario: {},
    id: 0
}

const UsuarioReducer = (state = initialState, action) => {
    switch (action.type) {
        case UsuarioConstants.CREATE_USER:
            return {
                ...state,
                usuario: action.user,
                infoUsuario: action.user
            }
        case UsuarioConstants.READ_USER:
            return {
                ...state,
                infoUsuario: action.data.user,
                id: action.data.id
            }
        case UsuarioConstants.UPDATE_USER:
            return {
                ...state,
                usuario: action.dataUser.user,
                id: action.dataUser.id,
                infoUsuario: action.dataUser.user
            }
        case UsuarioConstants.DELETE_USER:
            return {
                ...initialState,
                infoUsuario: null
            }
        case UsuarioConstants.EDIT_USER:
            return {
                ...state,
                infoUsuario: action.usuario
            }
        default:
            return state
    }
}

export default UsuarioReducer