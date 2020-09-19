import { ProdutoService } from '../services/ProdutoService'
import { CategoriaService } from '../services/CategoriaService'
import { UsuarioService } from '../services/UsuarioService'

export const CREATE_PRODUTO = 'CREATE_PRODUTO'
export const UPDATE_PRODUTO = 'UPDATE_PRODUTO'
export const DELETE_PRODUTO = 'DELETE_PRODUTO'
export const GET_PRODUTOS = 'GET_PRODUTOS'
export const GET_PRODUTO = 'GET_PRODUTO'
export const TITULO_CATEGORIA = 'TITULO_CATEGORIA'

export const salvarProduto = (produto) => {
    return async (dispatch) => {
        const storage = await UsuarioService.getLoginInSession()

        const data = await ProdutoService.salvarProduto(produto, storage.token)
        dispatch({
            type: CREATE_PRODUTO,
            data
        })
    }
}

export const alterarProduto = (id, produto) => {
    return async (dispatch) => {
        const storage = await UsuarioService.getLoginInSession()

        const data = await ProdutoService.alterarProduto(id, produto, storage.token)
        dispatch({
            type: UPDATE_PRODUTO,
            data
        })
    }
}

export const removerProduto = (id) => {
    return async (dispatch) => {
        const storage = await UsuarioService.getLoginInSession()

        await ProdutoService.removerProduto(id, storage.token)
        dispatch({
            type: DELETE_PRODUTO,
            id
        })
    }
}

export const listarProdutos = (idcategoria, tipousuario, titulo = null) => {
    return async (dispatch) => {
        let datas;
        if (titulo == null) {
            if (tipousuario == 'A') {
                datas = await ProdutoService.listarProdutos(idcategoria)
            } else {
                datas = await ProdutoService.listarProdutosAtivos(idcategoria)
            }
        } else {
            if (tipousuario == 'A') {
                datas = await ProdutoService.listarProdutosPelaCategoriaTitulo(idcategoria, titulo)
            } else {
                datas = await ProdutoService.listarProdutosAtivosPelaCategoriaTitulo(idcategoria, titulo)
            }
        }
        dispatch({
            type: GET_PRODUTOS,
            datas
        })
    }
}

export const listaProdutoById = (id) => {
    return async (dispatch) => {
        const data = await ProdutoService.listaProdutoById(id)
        dispatch({
            type: GET_PRODUTO,
            data
        })
    }
}

export const setTituloCategoria = (idcategoria) => {
    return async (dispatch) => {
        const categoria = await CategoriaService.listaCategoriaById(idcategoria)
        dispatch({
            type: TITULO_CATEGORIA,
            data: categoria.descricao
        })
    }
}