import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
const axios = require('axios');
const config = "http://192.168.100.12:8080/"

export const ApiService = {
    async get(endpoint) {
        return axios.get(`${config}${endpoint}`)
            .then(response => {
                if (response.data) {
                    if (response.data.data) {
                        return response.data.data
                    }
                    if (response.data.errors) {
                        if (response.data.errors.length > 0) {
                            Alert.alert("Atenção", JSON.stringify(response.data.errors))
                            return null
                        }
                    }
                    return null
                } else {
                    return null
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    let msg = "";
                    if (error.response.data.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = error.response.data.errors.map(item => `\n- ${item}`)
                    }
                    Alert.alert('Atenção', `Mensagem de erro: ${msg}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro na requisição!`)
                }
            })
    },
    async post(endpoint, data) {
        return axios.post(`${config}${endpoint}`, data)
            .then(response => {
                if (response.data) {
                    if (response.data.data) {
                        return response.data.data
                    }
                    if (response.data.errors) {
                        if (response.data.errors.length > 0) {
                            Alert.alert("Atenção", JSON.stringify(response.data.errors))
                            return null
                        }
                    }
                    return null
                } else {
                    return null
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    let msg = "";
                    if (error.response.data.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = error.response.data.errors.map(item => `\n- ${item}`)
                    }
                    Alert.alert('Atenção', `Mensagem de erro: ${msg}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro na requisição!`)
                }
            })
    },
    async put(endpoint, data) {
        return axios.put(`${config}${endpoint}`, data)
            .then(response => {
                if (response.data) {
                    if (response.data.data) {
                        return response.data.data
                    }
                    if (response.data.errors) {
                        if (response.data.errors.length > 0) {
                            Alert.alert("Atenção", JSON.stringify(response.data.errors))
                            return null
                        }
                    }
                    return null
                } else {
                    return null
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    let msg = "";
                    if (error.response.data.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = error.response.data.errors.map(item => `\n- ${item}`)
                    }
                    Alert.alert('Atenção', `Mensagem de erro: ${msg}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro na requisição!`)
                }
            })
    },
    async delete(endpoint) {
        return axios.delete(`${config}${endpoint}`)
            .then(response => response)
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    let msg = "";
                    if (error.response.data.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = error.response.data.errors.map(item => `\n- ${item}`)
                    }
                    Alert.alert('Atenção', `Mensagem de erro: ${msg}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro na requisição!`)
                }
            })
    },
    async getToken(endpoint, token) {
        return axios.get(`${config}${endpoint}`, { headers: { "Authorization": `token ${token}` } })
            .then(response => {
                if (response.data) {
                    if (response.data.data) {
                        return response.data.data
                    }
                    if (response.data.errors) {
                        if (response.data.errors.length > 0) {
                            Alert.alert("Atenção", JSON.stringify(response.data.errors))
                            return null
                        }
                    }
                    return null
                } else {
                    return null
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    let msg = "";
                    if (error.response.data.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = error.response.data.errors.map(item => `\n- ${item}`)
                    }
                    Alert.alert('Atenção', `Mensagem de erro: ${msg}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro na requisição!`)
                }
            })
    },
    async postToken(endpoint, data, token) {
        return axios.post(`${config}${endpoint}`, data, { headers: { "Authorization": `token ${token}` } })
            .then(response => {
                if (response.data) {
                    if (response.data.data) {
                        return response.data.data
                    }
                    if (response.data.errors) {
                        if (response.data.errors.length > 0) {
                            Alert.alert("Atenção", JSON.stringify(response.data.errors))
                            return null
                        }
                    }
                    return null
                } else {
                    return null
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    let msg = "";
                    if (error.response.data.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = error.response.data.errors.map(item => `\n- ${item}`)
                    }
                    Alert.alert('Atenção', `Mensagem de erro: ${msg}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro na requisição!`)
                }
            })
    },
    async putToken(endpoint, data, token) {
        return axios.put(`${config}${endpoint}`, data, { headers: { "Authorization": `token ${token}` } })
            .then(response => {
                if (response.data) {
                    if (response.data.data) {
                        return response.data.data
                    }
                    if (response.data.errors) {
                        if (response.data.errors.length > 0) {
                            Alert.alert("Atenção", JSON.stringify(response.data.errors))
                            return null
                        }
                    }
                    return null
                } else {
                    return null
                }
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    let msg = "";
                    if (error.response.data.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = error.response.data.errors.map(item => `\n- ${item}`)
                    }
                    Alert.alert('Atenção', `Mensagem de erro: ${msg}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro na requisição!`)
                }
            })
    },
    async deleteToken(endpoint, token) {
        return axios.delete(`${config}${endpoint}`, { headers: { "Authorization": `token ${token}` } })
            .then(response => response)
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    let msg = "";
                    if (error.response.data.message) {
                        msg = error.response.data.message;
                    } else {
                        msg = error.response.data.errors.map(item => `\n- ${item}`)
                    }
                    Alert.alert('Atenção', `Mensagem de erro: ${msg}`)
                } else if (error.request) {
                    // The request was made but no response was received
                    Alert.alert('Atenção', `Mensagem de erro: Erro com conexão ao servidor.`)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro na requisição!`)
                }
            })
    },
    async insertData(data) {
        try {
            await AsyncStorage.setItem('USER_LOGGED', JSON.stringify(data));
        } catch (err) {
            Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro no momento de salvar a informação!`)
        }
    },
    async deleteData() {
        try {
            await AsyncStorage.removeItem('USER_LOGGED');
        } catch (err) {
            Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro no momento de excluir a informação!`)
        }
    },
    async getItem() {
        try {
            const userLogged = await AsyncStorage.getItem('USER_LOGGED')
            return userLogged != null ? JSON.parse(userLogged) : null;
        } catch (err) {
            Alert.alert('Atenção', `Mensagem de erro: Ocorreu algum erro no momento de puxar a informação!`)
        }
    }
}