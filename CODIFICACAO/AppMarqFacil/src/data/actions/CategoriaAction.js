import { CategoriaService } from '../services/CategoriaService'
import { UsuarioService } from '../services/UsuarioService'

export const CREATE_CATEGORIA = 'CREATE_CATEGORIA'
export const UPDATE_CATEGORIA = 'UPDATE_CATEGORIA'
export const DELETE_CATEGORIA = 'DELETE_CATEGORIA'
export const GET_CATEGORIAS = 'GET_CATEGORIAS'
export const GET_CATEGORIA_ID = 'GET_CATEGORIA_ID'

export const createCategoria = (categoria) => {
    return async (dispatch) => {
        try {
            const storage = await UsuarioService.getLoginInSession()

            const data = await CategoriaService.salvarCategoria(categoria, storage.token)
            dispatch({
                type: CREATE_CATEGORIA,
                data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const updateCategoria = (idcategoria, categoria) => {
    return async (dispatch) => {
        try {
            const storage = await UsuarioService.getLoginInSession()

            const data = await CategoriaService.alterarCategoria(idcategoria, categoria, storage.token)
            dispatch({
                type: UPDATE_CATEGORIA,
                data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const removerCategoria = (id) => {
    return async (dispatch) => {
        try {
            const storage = await UsuarioService.getLoginInSession()

            await CategoriaService.removerCategoria(id, storage.token)
            dispatch({
                type: DELETE_CATEGORIA,
                id
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getListaCategorias = () => {
    return async (dispatch) => {
        try {
            const datas = await CategoriaService.listarCategorias()
            dispatch({
                type: GET_CATEGORIAS,
                datas
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getListaCategoriasTipo = (tipo, idempresa) => {
    return async (dispatch) => {
        try {
            const datas = await CategoriaService.listarCategoriasTipo(tipo, idempresa)
            dispatch({
                type: GET_CATEGORIAS,
                datas
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const getCategoriaById = (idcategoria) => {
    return async (dispatch) => {
        try {
            const data = await CategoriaService.listaCategoriaById(idcategoria)
            dispatch({
                type: GET_CATEGORIAS,
                data
            })
        } catch (err) {
            console.log(err)
        }
    }
}