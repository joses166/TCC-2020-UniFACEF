const axios = require('axios')

export const EnderecoService = {
    getEndereco(cep) {
        return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response, info) => JSON.stringify(response.data))
            .catch(error => console.log(error))
    }
}