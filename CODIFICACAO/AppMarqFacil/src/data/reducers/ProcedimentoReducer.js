import * as ProcedimentoConstants from '../actions/ProcedimentoAction'

initialState = {
    procedimento: null,
    procedimentos: []
}

const ProcedimentoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProcedimentoConstants.CREATE_PROCEDIMENTO:
            return {
                ...state,
                procedimentos: [...state.procedimentos, action.data]
            }
        case ProcedimentoConstants.UPDATE_PROCEDIMENTO:
            const procedimentos = state.procedimentos.map((item) => {
                if (item.idprocedimento == action.data.idprocedimento) {
                    return action.data
                }
                return item
            })
            return {
                ...state,
                procedimentos
            }
        case ProcedimentoConstants.DELETE_PROCEDIMENTO:
            const itemIndex = state.procedimentos.findIndex(item => item.idprocedimento === action.id)
            return {
                ...state,
                procedimentos: [...state.procedimentos.slice(0, itemIndex), ...state.procedimentos.slice(itemIndex + 1)],
                procedimento: null
            }
        case ProcedimentoConstants.GET_PROCEDIMENTOS:
            return {
                ...state,
                procedimentos: action.datas
            }
        case ProcedimentoConstants.GET_PROCEDIMENTO:
            return {
                ...state,
                procedimento: action.data
            }
        case ProcedimentoConstants.TITULO_CATEGORIA:
            return {
                ...state,
                titulocategoria: action.data
            }
        default:
            return state
    }
}

export default ProcedimentoReducer