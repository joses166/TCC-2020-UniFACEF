import * as CategoriaConstants from '../actions/CategoriaAction'

initialState = {
    categoria: null,
    categorias: []
}

const CategoriaReducer = (state = initialState, action) => {
    switch (action.type) {
        case CategoriaConstants.CREATE_CATEGORIA:
            return {
                ...state,
                categorias: [ ...state.categorias, action.data ]
            }
        case CategoriaConstants.UPDATE_CATEGORIA:
            const categorias = state.categorias.map((item) => {
                if ( item.idcategoria == action.data.idcategoria ) {
                    return action.data
                }
                return item
            })
            return {
                ...state,
                categorias
            }
        case CategoriaConstants.DELETE_CATEGORIA:
            const itemIndex = state.categorias.findIndex(item => item.idcategoria === action.id)
            return {
                ...state,
                categorias: [ ...state.categorias.slice(0, itemIndex), ...state.categorias.slice(itemIndex + 1) ],
                categoria: null
            }
        case CategoriaConstants.GET_CATEGORIAS:
            return {
                ...state,
                categorias: action.datas
            }
        case CategoriaConstants.GET_CATEGORIA_ID:
            return {
                ...state,
                categoria: action.data
            }
        default: 
            return state
    }
}

export default CategoriaReducer