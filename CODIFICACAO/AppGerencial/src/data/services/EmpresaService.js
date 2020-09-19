import { ApiService } from './ApiService'

export const EmpresaService = {
    // Rota para alterar cadastro de uma empresa.
    alterarEmpresa(id, data) {
        return ApiService.put(`empresas/${id}`, data)
    },
    // Rota para cadastro de uma nova empresa.
    cadastrarEmpresa(data) { 
        return ApiService.post(`empresas`, data)
    },
    // Rota para listagem de todas as empresas cadastradas.
    getEmpresa() {
        return ApiService.get(`empresas`)
    },
    // Rota para remover uma empresa.
    removerEmpresa(id) {
        return ApiService.delete(`empresas/${id}`)
    },
    // Rota para listar os dados de uma empresa especificada pelo id
    getEmpresaById(id) {
        return ApiService.get(`empresas/${id}`)
    }
}