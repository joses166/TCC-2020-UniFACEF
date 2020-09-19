import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './screens/views/inicio'
import Empresa from './screens/views/empresa'
import EditarEmpresa from './screens/views/empresa/editar'
import Confirmacao from './screens/views/confirmacao'
import ListaEmpresas from './screens/views/listaempresa'
import Usuario from './screens/views/usuario'
import EditarUsuario from './screens/views/usuario/editar'
import InfoUsuario from './screens/views/infousuario'
import NewUser from './screens/views/usuario/newuser'

const Stack = createStackNavigator();

class Navigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode={'none'} initialRouteName={Inicio} >
                    <Stack.Screen name="Inicio" component={Inicio} />
                    <Stack.Screen name="Empresa" component={Empresa} />
                    <Stack.Screen name="Usuario" component={Usuario} />    
                    <Stack.Screen name="EditarEmpresa" component={EditarEmpresa} />
                    <Stack.Screen name="ListaEmpresas" component={ListaEmpresas} />
                    <Stack.Screen name="Confirmacao" component={Confirmacao} />
                    <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
                    <Stack.Screen name="InfoUsuario" component={InfoUsuario} />
                    <Stack.Screen name="NewUser" component={NewUser} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator