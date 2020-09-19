import { ApiService } from './ApiService'

export const UsuarioService = {
    // Rota para alterar cadastro de um usuário.
    alterarUsuario(id, data) {
        return ApiService.put(`usuarios/${id}`, data)
    },
    // Rota para cadastro de um novo usuário.
    cadastrarUsuario(data) {
        return ApiService.post(`usuarios`, data)
    },
    // Rota para listar o usuário administrador.
    pesquisarUsuarioAdmin(id) {
        return ApiService.get(`usuarios/admin/${id}`)
    },
    // Rota para remover um usuário.
    removerUsuario(id) {
        return ApiService.delete(`usuarios/${id}`)
    },
    // Rota para listar o usuário pelo id.
    pesquisarUsuario(id) {
        return ApiService.get(`usuarios/${id}`)
    },
}