import { EmpresaService } from '../services/EmpresaService'

export const CREATE_EMPRESA = "CREATE_EMPRESA";
export const READ_EMPRESA = "READ_EMPRESA";
export const READ_EMPRESAS = "READ_EMPRESAS";
export const UPDATE_EMPRESA = "UPDATE_EMPRESA";
export const DELETE_EMPRESA = "DELETE_EMPRESA";
export const INSERT_EMPRESA = "INSERT_EMPRESA";
export const EDIT_EMPRESA = "EDIT_EMPRESA";

export const createEmpresa = (data) => {
    return async (dispatch) => {
        const empresa = await EmpresaService.cadastrarEmpresa(data)
        dispatch({
            type: CREATE_EMPRESA,
            empresa
        })
    }
}

export const readEmpresa = (id) => {
    return (dispatch) => {
        dispatch({
            type: READ_EMPRESA,
            empresa
        })
    }
}

export const readEmpresas = () => {
    return async (dispatch) => {
        const empresas = await EmpresaService.getEmpresa()
        dispatch({
            type: READ_EMPRESAS,
            empresas
        })
    }
}

export const updateEmpresa = (id, data) => {
    return async (dispatch) => {
        const empresa = await EmpresaService.alterarEmpresa(id, data)
        dispatch({
            type: UPDATE_EMPRESA,
            data: { idempresa: id, empresa: empresa }
        })
    }
}

export const deleteEmpresa = (idempresa) => {
    return async (dispatch) => {
        await EmpresaService.removerEmpresa(idempresa)
        dispatch({
            type: DELETE_EMPRESA,
            idempresa
        })
    }
}

export const insertEmpresa = (empresa) => {
    return (dispatch) => {
        dispatch({
            type: INSERT_EMPRESA,
            empresa
        })
    }
}

export const editEmpresa = (id) => {
    return async (dispatch) => {
        const empresa = await EmpresaService.getEmpresaById(id)
        dispatch({
            type: EDIT_EMPRESA,
            empresa
        })
    }
}