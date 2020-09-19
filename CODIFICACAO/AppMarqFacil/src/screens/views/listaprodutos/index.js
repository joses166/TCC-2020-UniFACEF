import React, { Component } from 'react';
import { Alert, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as ProdutoActions from '../../../data/actions/ProdutoAction';
import * as CarregandoActions from '../../../data/actions/CarregandoAction';

class ListaProdutos extends Component {
  state = {
    pesquisaproduto: ''
  }

  onEditProduto = (item) => {
    this.props.navigation.navigate("CadastroProduto", item)
  }

  onDeleteProduto = (item) => {
    Alert.alert(
      "Atenção",
      `Deseja realmente excluir o produto: ${item.titulo} ?`,
      [
        {
          text: 'Confirmar',
          onPress: async () => {
            await this.props.dispatch(CarregandoActions.loading())
            await this.props.dispatch(ProdutoActions.removerProduto(item.idproduto))
            await this.props.dispatch(CarregandoActions.notLoading())
          }
        },
        { text: 'Cancelar' }
      ]
    )
  }

  onPressProduto = async (item) => {
    const idproduto = item.idproduto
    await this.props.dispatch(CarregandoActions.loading())
    await this.props.dispatch(ProdutoActions.listaProdutoById(idproduto))
    await this.props.dispatch(CarregandoActions.notLoading())
    this.props.navigation.navigate("InformacaoProduto")
  }

  onChangeTextPesquisa = async (titulo) => {
    this.setState({ pesquisaproduto: titulo })
    const tipousuario = (this.props.dataUsuario.usuarioLogado.tipousuario)
    const idcategoria = this.props.route.params.idcategoria

    if (tipousuario != null && idcategoria > 0) {
      if (titulo.length > 0) {
        await this.props.dispatch(CarregandoActions.loading())
        await this.props.dispatch(ProdutoActions.listarProdutos(idcategoria, tipousuario, titulo))
        await this.props.dispatch(CarregandoActions.notLoading())
      } else {
        await this.props.dispatch(CarregandoActions.loading())
        await this.props.dispatch(ProdutoActions.listarProdutos(idcategoria, tipousuario))
        await this.props.dispatch(CarregandoActions.notLoading())
      }
    }
  }

  render() {
    return (
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 100 }}>

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: ((this.props.dataUsuario.usuarioLogado == null) ? 'flex-start' : (this.props.dataUsuario.usuarioLogado.tipousuario == 'A') ? 'space-between' : 'flex-start'),
            alignItems: 'center',
            paddingVertical: 20
          }}
        >

          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              marginRight: ((this.props.dataUsuario.usuarioLogado == null) ? 30 : (this.props.dataUsuario.usuarioLogado.tipousuario == 'A') ? 0 : 30),
            }}
          >
            <Icon name='chevron-left' color='#707070' size={30} />
          </TouchableOpacity>

          <Text style={{ fontSize: 18 }}>PRODUTOS</Text>

          {
            this.props.dataUsuario.usuarioLogado != null &&
            (this.props.dataUsuario.usuarioLogado.tipousuario == 'A' &&
              <TouchableOpacity
                style={{ width: 30, height: 30 }}
                onPress={() => this.props.navigation.navigate("CadastroProduto")}
              >
                <Image source={require('../../../assets/images/adicionar.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
              </TouchableOpacity>
            )
          }

        </View>

        <Text style={{ width: '90%', fontSize: 20 }} >{this.props.dataProduto.titulocategoria}</Text>

        <View style={{
          width: '90%',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#707070',
          padding: 2,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10
        }} >
          <Icon style={{ marginLeft: '2%', width: '10%', alignItems: 'center', justifyContent: 'center' }} name={'search'} size={20} color={'#707070'} />
          <TextInput
            style={{ width: '85%' }}
            placeholder={'Pesquise o produto por aqui'}
            value={this.state.pesquisaproduto}
            onChangeText={titulo => this.onChangeTextPesquisa(titulo)}
          />
        </View>

        {
          (
            (!this.props.dataProduto.produtos) ||
            (this.props.dataProduto.produtos == null) ||
            (this.props.dataProduto.produtos == []) ||
            (this.props.dataProduto.produtos.length == 0)
          )
          &&
          <View style={{ width: '90%', flexDirection: 'row', marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Não existem dados cadastrados.</Text>
          </View>
        }

        {
          (
            (this.props.dataProduto.produtos) ||
            (this.props.dataProduto.produtos != null) ||
            (this.props.dataProduto.produtos != []) ||
            (this.props.dataProduto.produtos.length > 0)
          )
          &&
          <FlatList
            data={this.props.dataProduto.produtos ? this.props.dataProduto.produtos : []}
            renderItem={({ item }) =>
              <Card style={{ width: '100%', marginVertical: 10, alignItems: 'center', paddingVertical: 10 }} onPress={() => this.onPressProduto(item)}>

                {
                  this.props.dataUsuario.usuarioLogado != null &&
                  (this.props.dataUsuario.usuarioLogado.tipousuario == 'A' &&
                    <View style={{ borderRadius: 10, padding: 5, marginBottom: 5, width: '100%', backgroundColor: (item.status == 1) ? 'rgba(0,203,20, 0.82)' : '#FF0909' }}>
                      <Text style={{ color: '#FFF' }}>{`PRODUTO ${(item.status == 1) ? 'ATIVADO' : 'DESATIVADO'}`}</Text>
                    </View>
                  )
                }

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }} >
                  <View style={{ width: ((this.props.dataUsuario.usuarioLogado == null) ? '100%' : (this.props.dataUsuario.usuarioLogado.tipousuario == 'A') ? '70%' : '100%') }} >
                    <Text style={{ fontSize: 16 }} >{item.titulo}</Text>
                  </View>
                  {
                    this.props.dataUsuario.usuarioLogado != null &&
                    (this.props.dataUsuario.usuarioLogado.tipousuario == 'A' &&
                      <View style={{ width: '30%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => this.onEditProduto(item)}>
                          <Image style={{ width: 30, height: 30 }} resizeMode={'contain'} source={require('../../../assets/images/editar.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onDeleteProduto(item)}>
                          <Image style={{ width: 30, height: 30 }} resizeMode={'contain'} source={require('../../../assets/images/excluir.png')} />
                        </TouchableOpacity>
                      </View>
                    )
                  }
                </View>
              </Card>
            }
            keyExtractor={item => `${item.idproduto}`}
          />
        }

      </View>
    )
  }
};

const mapStateToProps = (state) => ({
  dataProduto: state.ProdutoReducer,
  dataUsuario: state.UsuarioReducer
})

export default connect(mapStateToProps)(ListaProdutos);