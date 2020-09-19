import { ApiService } from './ApiService'

export const CategoriaService = {
    // Rota para alterar uma categoria.
    alterarCategoria(id, data, token) {
        return ApiService.putToken(`categorias/operacao/${id}`, data, token)
    },
    // Rota para cadastrar uma nova categoria.
    salvarCategoria(data, token) {
        return ApiService.postToken(`categorias/operacao`, data, token)
    },
    // Rota para remover uma categoria.   
    removerCategoria(id, token) {
        return ApiService.deleteToken(`categorias/operacao/${id}`, token)
    },
    // Rota para listar todas as categorias.
    listarCategorias() {
        return ApiService.get(`categorias`)
    },
    // Rota para listar categorias pelo tipo.    
    listarCategoriasTipo(tipo, idempresa) {
        return ApiService.get(`categorias/${tipo}/empresa/${idempresa}`)
    },
    // Rota para listar categoria pelo idcategoria.
    listaCategoriaById(id) {
        return ApiService.get(`categorias/${id}`)
    }
}