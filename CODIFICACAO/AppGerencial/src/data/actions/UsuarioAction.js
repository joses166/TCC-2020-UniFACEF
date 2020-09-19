import { UsuarioService } from '../services/UsuarioService'

export const CREATE_USER = 'CREATE_USER'
export const READ_USER = 'READ_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'
export const EDIT_USER = 'EDIT_USER'

export const createUser = (user) => {
    return async (dispatch) => {
        await UsuarioService.cadastrarUsuario(user)
        dispatch({
            type: CREATE_USER,
            user
        })
    }
}

export const readUser = (id) => {
    return async (dispatch) => {
        const user = await UsuarioService.pesquisarUsuarioAdmin(id)
        dispatch({
            type: READ_USER,
            data: {user, id}
        })
    }
}

export const updateUser = (id, user) => {
    return async (dispatch) => {
        await UsuarioService.alterarUsuario(id, user)
        dispatch({
            type: UPDATE_USER,
            dataUser: {id, user}
        })
    }
}

export const deleteUser = (id) => {
    return async (dispatch) => {
        await UsuarioService.removerUsuario(id)
        dispatch({
            type: DELETE_USER,
            id
        })
    }
}

export const editUser = (id) => {
    return async (dispatch) => {
        const usuario = await UsuarioService.pesquisarUsuario(id)
        dispatch({
            type: EDIT_USER,
            usuario
        })
    }
}