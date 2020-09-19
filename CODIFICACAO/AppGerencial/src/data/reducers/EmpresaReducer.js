import * as EmpresaConstants from '../actions/EmpresaAction'

initialState = {
    listEmpresas: [],
    empresa: {},
    infoempresa: {},
    editempresa: {}
}

const EmpresaReducer = (state = initialState, action) => {
    switch (action.type) {
        case EmpresaConstants.CREATE_EMPRESA:
            return {
                ...state,
                infoempresa: action.empresa
            };
        case EmpresaConstants.READ_EMPRESA:
            return {
                ...state,
                empresa: {
                    ...action.empresa
                }
            };
        case EmpresaConstants.READ_EMPRESAS:
            return {
                ...state,
                listEmpresas: [
                    ...action.empresas
                ]
            };
        case EmpresaConstants.UPDATE_EMPRESA:
            const listEmpresas = state.listEmpresas.map((item) => {
                if (item.idempresa == action.data.idempresa) {
                    return action.data.empresa
                }
                return item
            })
            return {
                ...state,
                listEmpresas,
                infoempresa: action.data.empresa,
                editempresa: {}
            };
        case EmpresaConstants.DELETE_EMPRESA:
            const itemIndex = state.listEmpresas.findIndex(item => item.idempresa === action.idempresa)
            return {
                ...state,
                listEmpresas: [ ...state.listEmpresas.slice(0, itemIndex), ...state.listEmpresas.slice(itemIndex + 1) ],
                empresa: {},
                infoempresa: {}
            };
        case EmpresaConstants.INSERT_EMPRESA:
            return {
                ...state,
                empresa: action.empresa
            }
        case EmpresaConstants.EDIT_EMPRESA:
            return {
                ...state,
                editempresa: action.empresa
            }
        default:
            return state;
    }
}

export default EmpresaReducer;