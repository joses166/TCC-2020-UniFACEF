import React, { Component } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as CategoriaActions from '../../../data/actions/CategoriaAction';
import * as CarregandoActions from '../../../data/actions/CarregandoAction';

class CadastroCategoria extends Component {
  state = {
    descricao: '',
    tipocategoria: '',
    idcategoria: null,
    idempresa: null
  }

  componentDidMount() {
    // Aqui fará a receptação dos itens da categoria
    const data = this.props.route.params
    if ( data && (data != null) ) {
      this.setState({
        descricao: data.descricao,
        tipocategoria: data.tipo,
        idcategoria: data.idcategoria,
        idempresa: data.idempresa
      })
    }
  }

  onPressCadastrar = async () => {
    const idcategoria = this.state.idcategoria
    let categoria = {
      descricao: this.state.descricao,
      tipo: this.state.tipocategoria,
      idempresa: this.props.dataEmpresa.empresa.idempresa
    }
    if (!(categoria.tipo == '') && (categoria.descricao.length > 0) && (categoria.idempresa > 0)) {
      if (categoria.descricao.length <= 80) {
        if (this.state.idcategoria == null) {
          
          await this.props.dispatch(CarregandoActions.loading())
          await this.props.dispatch(CategoriaActions.createCategoria(categoria))
          await this.props.dispatch(CarregandoActions.notLoading())

          if (categoria.tipo == 1) {
            this.props.navigation.navigate("CategoriasProdutos")
          } else if (categoria.tipo == 2) {
            this.props.navigation.navigate("CategoriasProcedimentos")
          }
        } else {
          categoria = {
            ...categoria,
            idcategoria
          }
          
          await this.props.dispatch(CarregandoActions.loading())
          await this.props.dispatch(CategoriaActions.updateCategoria(idcategoria, categoria))
          await this.props.dispatch(CarregandoActions.notLoading())

          if (categoria.tipo == 1) {
            this.props.navigation.navigate("CategoriasProdutos")
          } else if (categoria.tipo == 2) {
            this.props.navigation.navigate("CategoriasProcedimentos")
          }
        }
      } else {
        Alert.alert("Atenção", "É necessário inserir um nome para a categoria com no máximo 80 caracteres.")
      }
    } else {
      Alert.alert("Atenção", "É necessário inserir um nome para a categoria e selecionar o tipo de categoria.")
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>

          <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>

            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='chevron-left' color='#707070' size={30} />
            </TouchableOpacity>

            <Text style={{ fontSize: 18 }}>CADASTRO DE CATEGORIA</Text>

          </View>

          <View style={{ width: '90%', alignItems: 'flex-start' }}>
            <Text style={{ width: '100%', fontSize: 16 }}>Nome da categoria</Text>
            <TextInput
              style={{ width: '100%', borderColor: '#707070', borderRadius: 10, borderWidth: 0.5, marginTop: 10, paddingHorizontal: 10 }}
              value={this.state.descricao}
              onChangeText={(descricao) => this.setState({ descricao })}
              placeholder={'Insira um nome para a categoria'}
              maxLength={80}
            />
          </View>

          <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 20 }}>
            <RadioButton.Group
              onValueChange={tipocategoria => this.setState({ tipocategoria })}
              value={this.state.tipocategoria}
            >
              <RadioButton.Item label="Produto" value={1} />
              <RadioButton.Item label="Procedimento" value={2} />
            </RadioButton.Group>
          </View>

          {/** BOTÕES DE VOLTAR E AVANÇAR */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginVertical: 20 }}>
            <TouchableOpacity
              style={{ width: '40%', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderRadius: 10, height: 40, borderColor: '#FF0909' }}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={{ color: '#FF0909', fontSize: 16, fontWeight: 'bold' }}>
                CANCELAR
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: '40%', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderRadius: 10, height: 40, borderColor: 'rgba(0,203,20, 0.82)' }}
              onPress={this.onPressCadastrar}
            >
              <Text style={{ color: 'rgba(0,203,20, 0.82)', fontSize: 16, fontWeight: 'bold' }}>
                {this.state.idcategoria == null ? 'CADASTRAR' : 'ALTERAR'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }
};

const mapStateToProps = (state) => ({
  dataEmpresa: state.EmpresaReducer
})

export default connect(mapStateToProps)(CadastroCategoria);