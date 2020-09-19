import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CadastroAtendimento from './screens/views/cadastroatendimento';
import CadastroAvaliacao from './screens/views/cadastroavaliacao';
import CadastroCategoria from './screens/views/cadastrocategoria';
import CadastroProcedimento from './screens/views/cadastroprocedimento';
import CadastroProduto from './screens/views/cadastroproduto';
import CadastroUsuario from './screens/views/cadastrousuario';
import CategoriasProcedimentos from './screens/views/categoriasprocedimentos';
import CategoriasProdutos from './screens/views/categoriasprodutos';
import DadosEmpresa from './screens/views/dadosempresa';
import DadosUsuario from './screens/views/dadosusuario';
import DialogHistorico from './screens/views/dialoghistorico';
import EsqueceuASenha from './screens/views/esqueceuasenha';
import FiltrandoEmpresa from './screens/views/filtrandoempresa';
import InformacaoAvaliacao from './screens/views/informacaoavaliacao';
import InformacaoProcedimento from './screens/views/informacaoprocedimento';
import InformacaoProduto from './screens/views/informacaoproduto';
import InformacaoUsuario from './screens/views/informacaousuario';
import ListaAtendimentos from './screens/views/listaatendimentos';
import ListaAvaliacoes from './screens/views/listaavaliacoes';
import ListaHistoricos from './screens/views/listahistoricos';
import ListaProcedimentos from './screens/views/listaprocedimentos';
import ListaProdutos from './screens/views/listaprodutos';
import ListaUsuarios from './screens/views/listausuarios';
import Login from './screens/views/login';
import Menu from './screens/views/menu';
import VerificaLogin from './screens/views/verificalogin';

const Stack = createStackNavigator();

class Navigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode={'none'} initialRouteName={VerificaLogin} >
                    <Stack.Screen name="VerificaLogin" component={VerificaLogin} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="FiltrandoEmpresa" component={FiltrandoEmpresa} />
                    <Stack.Screen name="Menu" component={Menu} />
                    <Stack.Screen name="CategoriasProdutos" component={CategoriasProdutos} />
                    <Stack.Screen name="CategoriasProcedimentos" component={CategoriasProcedimentos} />
                    <Stack.Screen name="CadastroCategoria" component={CadastroCategoria} />
                    <Stack.Screen name="ListaProdutos" component={ListaProdutos} />
                    <Stack.Screen name="CadastroProduto" component={CadastroProduto} />
                    <Stack.Screen name="InformacaoProduto" component={InformacaoProduto} />
                    <Stack.Screen name="ListaProcedimentos" component={ListaProcedimentos} />
                    <Stack.Screen name="CadastroProcedimento" component={CadastroProcedimento} />
                    <Stack.Screen name="InformacaoProcedimento" component={InformacaoProcedimento} />
                    <Stack.Screen name="DadosUsuario" component={DadosUsuario} />
                    <Stack.Screen name="DadosEmpresa" component={DadosEmpresa} />
                    <Stack.Screen name="ListaAvaliacoes" component={ListaAvaliacoes} />
                    <Stack.Screen name="InformacaoAvaliacao" component={InformacaoAvaliacao} />
                    <Stack.Screen name="CadastroAvaliacao" component={CadastroAvaliacao} />
                    <Stack.Screen name="ListaUsuarios" component={ListaUsuarios} />
                    <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
                    <Stack.Screen name="InformacaoUsuario" component={InformacaoUsuario} />
                    <Stack.Screen name="ListaHistoricos" component={ListaHistoricos} />
                    <Stack.Screen name="DialogHistorico" component={DialogHistorico} />
                    <Stack.Screen name="ListaAtendimentos" component={ListaAtendimentos} /> 
                    <Stack.Screen name="CadastroAtendimento" component={CadastroAtendimento} />
                    <Stack.Screen name="EsqueceuASenha" component={EsqueceuASenha} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator