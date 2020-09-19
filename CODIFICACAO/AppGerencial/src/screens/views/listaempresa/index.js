import React, { Component } from 'react';
import { Alert, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as EmpresaActions from '../../../data/actions/EmpresaAction';
import CardEmpresa from '../../components/CardEmpresa';
import TopMenu from '../../components/TopMenu';
import * as UsuarioActions from '../../../data/actions/UsuarioAction';
import * as CarregandoActions from '../../../data/actions/CarregandoAction';

class ListaEmpresa extends Component {
  async componentDidMount() {
    await this.props.dispatch(CarregandoActions.loading())
    await this.props.dispatch(EmpresaActions.readEmpresas())
    await this.props.dispatch(CarregandoActions.notLoading())
  }

  onClick = async (id) => {
    await this.props.dispatch(CarregandoActions.loading())
    await this.props.dispatch(UsuarioActions.readUser(id))
    await this.props.dispatch(CarregandoActions.notLoading())
    this.props.navigation.navigate("InfoUsuario")
  }

  onDelete = (id) => {
    Alert.alert(
      "Atenção",
      "Deseja realmente excluir a empresa ?",
      [
        {
          text: "Sim",
          onPress: async () => {
            await this.props.dispatch(CarregandoActions.loading())
            await this.props.dispatch(EmpresaActions.deleteEmpresa(id))
            await this.props.dispatch(CarregandoActions.notLoading())
          }
        },
        { text: "Não" }
      ]
    )
  }

  onEdit = async (item) => {
    Alert.alert(
      "Atenção",
      "Deseja realmente editar a empresa ?",
      [
        {
          text: "Sim",
          onPress: async () => {
            await this.props.dispatch(CarregandoActions.loading())
            await this.props.dispatch(EmpresaActions.editEmpresa(item.idempresa))
            await this.props.dispatch(CarregandoActions.notLoading())
            this.props.navigation.navigate("EditarEmpresa")
          }
        },
        { text: "Não" }
      ]
    )
  }

  render() {
    return (
      <View>

        <TopMenu
          onPress={() => this.props.navigation.navigate("Inicio")}
          topPage={'LISTAR EMPRESAS CADASTRADAS'}
        />

        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

          {this.props.dataempresa.listEmpresas && this.props.dataempresa.listEmpresas.length > 0 &&
            < FlatList
              style={{ width: '90%' }}
              data={this.props.dataempresa.listEmpresas}
              renderItem={({ item }) =>
                <CardEmpresa
                  key={`${item.idempresa}`}
                  onClick={() => this.onClick(item.idempresa)}
                  onEdit={() => this.onEdit(item)}
                  onDelete={() => this.onDelete(item.idempresa)}
                  razaosocial={item.razaosocial}
                />
              }
              keyExtractor={item => `${item.idempresa}`}
            />
          }

          {((!this.props.dataempresa.listEmpresas) || (!(this.props.dataempresa.listEmpresas.length > 0))) &&
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Não existem empresas cadastradas. </Text>  
            </View>
          }


        </View>

      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  dataempresa: state.EmpresaReducer
})

export default connect(mapStateToProps)(ListaEmpresa);