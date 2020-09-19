import moment from 'moment';
import React, { Component } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import * as UsuarioActions from '../../../data/actions/UsuarioAction';
import * as CarregandoActions from '../../../data/actions/CarregandoAction';
import TopMenu from '../../components/TopMenu';

class InfoUsuario extends Component {

  registerNewUser = () => {
    Alert.alert(
      "Atenção",
      "Deseja realmente criar o usuário ?",
      [
        {
          text: "Sim",
          onPress: () => this.props.navigation.navigate("NewUser")
        },
        { text: "Não" }
      ]
    )
  }

  onDelete = () => {
    const id = this.props.datausuario.infoUsuario.idusuario
    Alert.alert(
      "Atenção",
      "Deseja realmente excluir o usuário ?",
      [
        {
          text: "Sim",
          onPress: async () => {
            await this.props.dispatch(CarregandoActions.loading())
            await this.props.dispatch(UsuarioActions.deleteUser(id))
            await this.props.dispatch(CarregandoActions.notLoading())
          }
        },
        { text: "Não" }
      ]
    )
  }

  onEdit = async () => {
    const id = this.props.datausuario.infoUsuario.idusuario
    Alert.alert(
      "Atenção",
      "Deseja realmente editar o usuário ?",
      [
        {
          text: "Sim",
          onPress: async () => {
            await this.props.dispatch(CarregandoActions.loading())
            await this.props.dispatch(UsuarioActions.editUser(id))
            await this.props.dispatch(CarregandoActions.notLoading())
            this.props.navigation.navigate("EditarUsuario")
          }
        },
        { text: "Não" }
      ]
    )
  }

  render() {
    return (
      <ScrollView>

        <TopMenu
          onPress={() => this.props.navigation.navigate("ListaEmpresas")}
          topPage={'USUÁRIO PRINCIPAL EMPRESA'}
        />

        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

          {(
            !(this.props.datausuario.infoUsuario) && (this.props.datausuario.infoUsuario == null)
          ) &&
            <Card style={Styles.styleCard}>
              <Card.Content style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                <Text style={{ textAlign: 'center', marginTop: 2 }}> NÃO EXISTE UM USUÁRIO CADASTRADO </Text>
                <TouchableOpacity style={[Styles.buttonContainer, { marginTop: 10 }]} onPress={this.registerNewUser}>
                  <Text style={Styles.buttonTitle}>
                    CADASTRAR USUÁRIO ADMIN
                  </Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          }

          {(
            (this.props.datausuario.infoUsuario) && (this.props.datausuario.infoUsuario != null)
          )
            &&
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Card style={{
                width: '90%',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                marginBottom: 10
              }}>
                <Card.Content style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                  <Text style={{ width: '90%', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>DADOS DE USUÁRIO</Text>
                  <Divider style={{ width: '100%', marginVertical: 10 }} />
                  <View style={{ width: '100%' }}>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> NOME: {this.props.datausuario.infoUsuario.nomecompleto} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> RG: {this.props.datausuario.infoUsuario.rg} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> CPF: {this.props.datausuario.infoUsuario.cpf} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> DATA DE NASCIMENTO: {moment(this.props.datausuario.infoUsuario.datanascimento).format('DD/MM/YYYY')} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> TELEFONE: {this.props.datausuario.infoUsuario.telefone} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> CELULAR: {this.props.datausuario.infoUsuario.celular} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> EMAIL: {this.props.datausuario.infoUsuario.email} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> USUÁRIO: {this.props.datausuario.infoUsuario.usuario} </Text>
                  </View>
                </Card.Content>
              </Card>

              <Card style={Styles.styleCard}>
                <Card.Content style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                  <Text style={{ width: '90%', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>DADOS DE ENDEREÇO</Text>
                  <Divider style={{ width: '100%', marginVertical: 10 }} />
                  <View style={{ width: '100%' }}>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> RUA: {this.props.datausuario.infoUsuario.endereco.rua} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> BAIRRO: {this.props.datausuario.infoUsuario.endereco.bairro} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> NÚMERO: {this.props.datausuario.infoUsuario.endereco.numero} </Text>
                    {this.props.datausuario.infoUsuario.endereco.complemento != null &&
                      <Text style={{ textAlign: 'justify', marginTop: 2 }}> COMPLEMENTO: {this.props.datausuario.infoUsuario.endereco.complemento} </Text>
                    }
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> CEP: {this.props.datausuario.infoUsuario.endereco.cep} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> CIDADE: {this.props.datausuario.infoUsuario.endereco.cidade} </Text>
                    <Text style={{ textAlign: 'justify', marginTop: 2 }}> ESTADO: {this.props.datausuario.infoUsuario.endereco.estado} </Text>
                  </View>
                </Card.Content>
              </Card>

              <View style={Styles.containerButton}>
                <TouchableOpacity style={Styles.buttonContainer} onPress={this.onEdit}>
                  <Text style={Styles.buttonTitle}>
                    EDITAR
              </Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.buttonContainer} onPress={this.onDelete}>
                  <Text style={Styles.buttonTitle}>
                    EXCLUIR
              </Text>
                </TouchableOpacity>
              </View>

            </View>
          }

        </View>

      </ScrollView>
    )
  }

}

const Styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleApp: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "100",
    width: Dimensions.get("screen").width * 2.5 / 3,
  },
  containerButton: {
    marginVertical: '5%',
    alignItems: 'center'
  },
  buttonContainer: {
    borderWidth: 0.5,
    borderColor: '#707070',
    borderRadius: 30,
    marginVertical: 10,
    padding: 10,
    width: Dimensions.get("screen").width * 2.5 / 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    fontSize: 16,
    color: '#707070',
  },
  containerTop: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerButtonReturn: {
    width: '90%',
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonReturn: {
    width: '10%'
  },
  titlePage: {
    width: '90%',
    fontSize: 18,
    color: '#707070'
  },
  styleCard: {
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10
  }
})

const mapStateToProps = (state) => ({
  datausuario: state.UsuarioReducer
})

export default connect(mapStateToProps)(InfoUsuario);