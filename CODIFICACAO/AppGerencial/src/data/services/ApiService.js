import { Alert } from 'react-native';
const axios = require('axios');
const config = "http://192.168.100.12:8080/"

export const ApiService = {
    async get(endpoint) {
        return axios.get(`${config}${endpoint}`)
            .then(response => {
                if (response.data.errors.length > 0) {
                    Alert.alert("Atenção", JSON.stringify(response.data.errors))
                } else {
                    return response.data.data
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    Alert.alert('Atenção', `Mensagem de erro: ${JSON.stringify(error.response.data.errors)}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.\n${JSON.stringify(error.request)}`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: ${JSON.stringify(error.message)}!`)
                }
            })
    },
    async post(endpoint, data) {
        return axios.post(`${config}${endpoint}`, data)
            .then(response => {
                if (response.data.errors.length > 0) {
                    Alert.alert("Atenção", JSON.stringify(response.data.errors))
                } else {
                    return response.data.data
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    Alert.alert('Atenção', `Mensagem de erro: ${JSON.stringify(error.response.data.errors)}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.\n${JSON.stringify(error.request)}`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: ${JSON.stringify(error.message)}!`)
                }
            })
    },
    async put(endpoint, data) {
        return axios.put(`${config}${endpoint}`, data)
            .then(response => {
                if (response.data.errors.length > 0) {
                    Alert.alert("Atenção", JSON.stringify(response.data.errors))
                } else {
                    return response.data.data
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    Alert.alert('Atenção', `Mensagem de erro: ${JSON.stringify(error.response.data.errors)}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.\n${JSON.stringify(error.request)}`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: ${JSON.stringify(error.message)}!`)
                }
            })
    },
    async delete(endpoint, id) {
        return axios.delete(`${config}${endpoint}`)
            .then(response => response)
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    Alert.alert('Atenção', `Mensagem de erro: ${JSON.stringify(error.response.data.errors)}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.\n${JSON.stringify(error.request)}`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: ${JSON.stringify(error.message)}!`)
                }
            })
    }
}