import { ApiService } from './ApiService'

export const ProcedimentoService = {
    // Rota para alterar um procedimento.
    alterarProcedimento(id, data, token) {
        return ApiService.putToken(`procedimentos/operacao/${id}`, data, token)
    },
    // Rota para cadastrar um novo procedimento.
    salvarProcedimento(data, token) {
        return ApiService.postToken(`procedimentos/operacao`, data, token)
    },
    // Rota para listar todos os procedimentos cadastrados.
    getListaProcedimentos() {
        return ApiService.get(`procedimentos`)
    },
    // Rota para listar todos os procedimentos ativos pela categoria.
    getListaProcedimentosAtivosIdCategoria(idcategoria) {
        return ApiService.get(`procedimentos/ativos/${idcategoria}`)
    },
    // Rota para listar todos os procedimentos ativos pela categoria e titulo.
    getListaProcedimentosAtivosIdCategoriaETitulo(idcategoria, titulo) {
        return ApiService.get(`procedimentos/ativos/${idcategoria}/${titulo}`)
    },
    // Rota para listar todos os procedimentos pela categoria.    
    getListaProcedimentosIdCategoria(idcategoria) {
        return ApiService.get(`procedimentos/categoria/${idcategoria}`)
    },
    // Rota para listar todos os procedimentos pela categoria e titulo.    
    getListaProcedimentosIdCategoriaETitulo(idcategoria, titulo) {
        return ApiService.get(`procedimentos/categoria/${idcategoria}/${titulo}`)
    },
    // Rota para listar todos os procedimentos ativos de uma empresa.
    getListaProcedimentosByEmpresa(idempresa) {
        return ApiService.get(`procedimentos/empresa/${idempresa}`)
    },
    // Rota para listar todos os procedimentos ativos de uma empresa com conversão para atributo Label e Value.
    getListaProcedimentosByEmpresaWithConverter(idempresa) {
        return ApiService.get(`procedimentos/empresa/${idempresa}/converter`)
    },
    // Rota para listar o procedimento pelo id.    
    getProcedimentoById(id) {
        return ApiService.get(`procedimentos/${id}`)
    },
    // Rota para remover um procedimento.    
    removerProcedimento(id, token) {
        return ApiService.deleteToken(`procedimentos/operacao/${id}`, token)
    }
}