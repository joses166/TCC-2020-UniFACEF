import { ApiService } from './ApiService'

export const ProdutoService = {
    // Rota para alterar um produto.
    alterarProduto(id, data, token) {
        return ApiService.putToken(`produtos/operacao/${id}`, data, token)
    },
    // Rota para cadastrar um novo produto.
    salvarProduto(data, token) {
        return ApiService.postToken(`produtos/operacao`, data, token)
    },
    // Rota para excluir um produto.
    removerProduto(id, token) {
        return ApiService.deleteToken(`produtos/operacao/${id}`, token)
    },
    // Rota para listar todos os produtos ativos pelo idcategoria.
    listarProdutosAtivos(idcategoria) {
        return ApiService.get(`produtos/categoria/${idcategoria}/ativos`)
    },
    // Rota para listar todos os produtos pelo idcategoria.
    listarProdutos(idcategoria) {
        return ApiService.get(`produtos/categoria/${idcategoria}`)
    },
    // Rota para listar o produto pelo id.
    listaProdutoById(id) {
        return ApiService.get(`produtos/${id}`)
    },
    // Rota para listar todos os produtos ativos pelo idcategoria.
    listarProdutosAtivosPelaCategoriaTitulo(idcategoria, titulo) {
        return ApiService.get(`produtos/categoria/${idcategoria}/ativos/${titulo}`)
    },
    // Rota para listar todos os produtos pelo idcategoria.
    listarProdutosPelaCategoriaTitulo(idcategoria, titulo) {
        return ApiService.get(`produtos/categoria/${idcategoria}/${titulo}`)
    },
}