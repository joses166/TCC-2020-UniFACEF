import { ProcedimentoService } from '../services/ProcedimentoService'
import { CategoriaService } from '../services/CategoriaService'
import { UsuarioService } from '../services/UsuarioService'
export const CREATE_PROCEDIMENTO = 'CREATE_PROCEDIMENTO'
export const UPDATE_PROCEDIMENTO = 'UPDATE_PROCEDIMENTO'
export const DELETE_PROCEDIMENTO = 'DELETE_PROCEDIMENTO'
export const GET_PROCEDIMENTO = 'GET_PROCEDIMENTO'
export const GET_PROCEDIMENTOS = 'GET_PROCEDIMENTOS'
export const TITULO_CATEGORIA = 'TITULO_CATEGORIA'

export const salvarProcedimento = (procedimento) => {
    return async (dispatch) => {
        const storage = await UsuarioService.getLoginInSession()

        const data = await ProcedimentoService.salvarProcedimento(procedimento, storage.token)
        dispatch({
            type: CREATE_PROCEDIMENTO,
            data
        })
    }
}

export const alterarProcedimento = (id, procedimento) => {
    return async (dispatch) => {
        const storage = await UsuarioService.getLoginInSession()

        const data = await ProcedimentoService.alterarProcedimento(id, procedimento, storage.token)
        dispatch({
            type: UPDATE_PROCEDIMENTO,
            data
        })
    }
}

export const removerProcedimento = (id) => {
    return async (dispatch) => {
        const storage = await UsuarioService.getLoginInSession()

        await ProcedimentoService.removerProcedimento(id, storage.token)
        dispatch({
            type: DELETE_PROCEDIMENTO,
            id
        })
    }
}

export const getProcedimentosById = (id) => {
    return async (dispatch) => {
        const data = await ProcedimentoService.getProcedimentoById(id)
        dispatch({
            type: GET_PROCEDIMENTO,
            data
        })
    }
}

export const getProcedimentos = (idcategoria, tipousuario, titulo = null) => {
    return async (dispatch) => {
        let datas;
        if (titulo == null) {
            if (tipousuario == 'A') {
                datas = await ProcedimentoService.getListaProcedimentosIdCategoria(idcategoria)
            } else {
                datas = await ProcedimentoService.getListaProcedimentosAtivosIdCategoria(idcategoria)
            }
        } else {
            if (tipousuario == 'A') {
                datas = await ProcedimentoService.getListaProcedimentosIdCategoriaETitulo(idcategoria, titulo)
            } else {
                datas = await ProcedimentoService.getListaProcedimentosAtivosIdCategoriaETitulo(idcategoria, titulo)
            }
        }
        dispatch({
            type: GET_PROCEDIMENTOS,
            datas
        })
    }
}

export const getProcedimentosSelect = (idempresa) => {
    return async (dispatch) => {
        const datas = await ProcedimentoService.getListaProcedimentosByEmpresa(idempresa)
        dispatch({
            type: GET_PROCEDIMENTOS,
            datas
        })
    }
}

export const getProcedimentosSelectMultiple = (idempresa) => {
    return async (dispatch) => {
        const datas = await ProcedimentoService.getListaProcedimentosByEmpresaWithConverter(idempresa)
        dispatch({
            type: GET_PROCEDIMENTOS,
            datas
        })
    }
}

export const setTituloCategoria = (idcategoria) => {
    return async(dispatch) => {
        const categoria = await CategoriaService.listaCategoriaById(idcategoria)
        dispatch({
            type: TITULO_CATEGORIA,
            data: categoria.descricao
        })
    }
}