import { EnderecoService } from '../services/EnderecoService'

export const GET_ENDERECO = 'GET_ENDERECO';

export const getEndereco = (cep) => {
    return async (dispatch) => {
        const endereco = await EnderecoService.getEndereco(cep)
        dispatch({
            type: GET_ENDERECO,
            endereco: endereco
        })
    }
}