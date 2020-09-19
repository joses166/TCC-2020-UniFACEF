import * as ProdutoConstants from '../actions/ProdutoAction'

initialState = {
    produto: null,
    produtos: [],
    titulocategoria: ''
}

const ProdutoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProdutoConstants.CREATE_PRODUTO:
            return {
                ...state,
                produtos: [...state.produtos, action.data]
            }
        case ProdutoConstants.UPDATE_PRODUTO:
            const produtos = state.produtos.map((item) => {
                if (item.idproduto == action.data.idproduto) {
                    return action.data
                }
                return item
            })
            return {
                ...state,
                produtos
            }
        case ProdutoConstants.DELETE_PRODUTO:
            const itemIndex = state.produtos.findIndex(item => item.idproduto === action.id)
            return {
                ...state,
                produtos: [...state.produtos.slice(0, itemIndex), ...state.produtos.slice(itemIndex + 1)],
                produto: null
            }
        case ProdutoConstants.GET_PRODUTOS:
            return {
                ...state,
                produtos: action.datas
            }
        case ProdutoConstants.GET_PRODUTO:
            return {
                ...state,
                produto: action.data
            }
        case ProdutoConstants.TITULO_CATEGORIA:
            return {
                ...state,
                titulocategoria: action.data
            }
        default:
            return state
    }
}

export default ProdutoReducer