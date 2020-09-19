import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-community/picker';
import * as CategoriaActions from '../../../data/actions/CategoriaAction';
import * as ProdutoActions from '../../../data/actions/ProdutoAction'
import { connect } from 'react-redux';
import * as CarregandoActions from '../../../data/actions/CarregandoAction';

const options = {
  title: 'Selecione uma imagem',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  takePhotoButtonTitle: 'Tirar foto...',
  chooseFromLibraryButtonTitle: 'Pegar foto da galeria...',
  cancelButtonTitle: 'Cancelar'
};

class CadastroProduto extends Component {
  state = {
    idcategoria: 0,
    idproduto: 0,
    titulo: '',
    descricao: '',
    preco: '',
    imagem: null,
    status: false,
    categorias: []
  }

  async componentDidMount() {
    if (this.props.route.params && this.props.route.params.idproduto) {
      const data = this.props.route.params
      this.setState({
        idcategoria: data.idcategoria,
        idproduto: data.idproduto,
        titulo: data.titulo,
        descricao: data.descricao,
        preco: data.preco,
        imagem: (data.imagem && data.imagem != null) ? { uri: `data:image/jpeg;base64,${data.imagem}` } : null,
        status: (data.status == 1) ? true : false
      })
    }

    const idempresa = this.props.dataEmpresa.empresa.idempresa

    if (idempresa > 0) {
      await this.props.dispatch(CarregandoActions.loading())
      await this.props.dispatch(CategoriaActions.getListaCategoriasTipo(1, idempresa))
      await this.props.dispatch(CarregandoActions.notLoading())
    }
  }

  onSelectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error || response.customButton) {
        Alert.alert("Atenção", "Pode ter ocorrido algum problema com sua foto.")
      } else {
        // Verificando tamanho da imagem
        let msg = '';
        if (response && response != null) {
          if (response.fileSize > 2000000) {
            msg += '\n- A imagem deve ser menor que 2MB;'
          }

          if (response.type != 'image/jpeg') {
            if (response.type != 'image/png') {
              msg += '\n- A imagem deve ser do tipo jpg ou png;'
            }
          }

          if (msg.length > 0) {
            Alert.alert("Atenção", msg)
          } else {
            this.setState({ imagem: response })
          }
        }
      }
    })
  }

  onPressCadastrar = async () => {
    const stateAtual = { ...this.state, descricao: ((this.state.descricao) ? this.state.descricao : '') }

    let msg = ''

    if (!(stateAtual.titulo.length > 0) || (stateAtual.titulo.length == null)) { msg += '\n- Inserir um nome para o produto.' }
    if (!(stateAtual.idcategoria > 0)) { msg += '\n- Selecionar uma categoria.' }
    if (!(stateAtual.titulo.length > 0) && !(stateAtual.titulo.length <= 80)) { msg += '\n- Inserir um nome para o produto que contenha no máximo 80 caracteres.' }
    if (!(stateAtual.descricao.length > 0) && !(stateAtual.descricao.length <= 150)) { msg += '\n- Inserir uma descrição para o produto que contenha no máximo 150 caracteres.' }

    if (msg.length > 0) {
      Alert.alert("Atenção", msg)
    } else {

      let preco = stateAtual.preco
      if (preco.length > 0) {
        preco = preco
          .replace('R$', '')
          .replace('.', '')
          .replace(',', '.')
      }

      const produto = {
        descricao: stateAtual.descricao,
        idcategoria: stateAtual.idcategoria,
        imagem: ((stateAtual.imagem == null) ? null : (stateAtual.imagem.data) ? stateAtual.imagem.data : stateAtual.imagem.uri.replace('data:image/jpeg;base64,', '')),
        preco: preco,
        status: (stateAtual.status) ? 1 : 0,
        titulo: stateAtual.titulo
      }

      if (!(stateAtual.idproduto > 0)) {
        await this.props.dispatch(CarregandoActions.loading())
        await this.props.dispatch(ProdutoActions.salvarProduto(produto))
        await this.props.dispatch(CarregandoActions.notLoading())
      } else {
        const produtoAlterado = {
          ...produto,
          idproduto: stateAtual.idproduto
        }
        await this.props.dispatch(CarregandoActions.loading())
        await this.props.dispatch(ProdutoActions.alterarProduto(produtoAlterado.idproduto, produtoAlterado))
        await this.props.dispatch(CarregandoActions.notLoading())
      }

      const tipousuario = (this.props.dataUsuario.usuarioLogado.tipousuario)
      const idcategoria = produto.idcategoria

      if (tipousuario != null && idcategoria > 0) {
        await this.props.dispatch(CarregandoActions.loading())
        await this.props.dispatch(ProdutoActions.listarProdutos(idcategoria, tipousuario))
        await this.props.dispatch(ProdutoActions.setTituloCategoria(stateAtual.idcategoria))
        await this.props.dispatch(CarregandoActions.notLoading())
        this.props.navigation.navigate("ListaProdutos")
      }
    }
  }

  render() {
    const { status } = this.state;
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

            <Text style={{ fontSize: 18 }}>CADASTRO DE PRODUTO</Text>

          </View>

          <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10 }}>
            <Text style={{ width: '100%', fontSize: 16 }}>Categoria</Text>
            <View
              style={{
                width: '100%',
                borderRadius: 10,
                borderColor: '#707070',
                borderWidth: 0.5,
                marginVertical: 10
              }}
            >
              <Picker
                selectedValue={this.state.idcategoria}
                onValueChange={ (item) => this.setState({idcategoria: item}) }>
                <Picker.Item color={'#707070'} label={'SELECIONE UMA CATEGORIA'} value={0} />
                {((this.props.dataCategoria.categorias) ? this.props.dataCategoria.categorias : []).map((item) => { return <Picker.Item key={`${item.idcategoria}`} color={'#707070'} label={item.descricao} value={item.idcategoria} /> })}
              </Picker>
            </View>
          </View>

          <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10 }}>
            <Text style={{ width: '100%', fontSize: 16 }}>Nome do Produto</Text>
            <TextInput
              style={{ width: '100%', borderColor: '#707070', borderRadius: 10, borderWidth: 0.5, marginTop: 10, paddingHorizontal: 10 }}
              maxLength={80}
              value={this.state.titulo}
              onChangeText={titulo => this.setState({ titulo })}
              placeholder={'Insira um nome do produto'}
            />
          </View>

          <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10 }}>
            <Text style={{ width: '100%', fontSize: 16 }}>Descrição</Text>
            <TextInput
              style={{
                width: '100%',
                borderColor: '#707070',
                borderRadius: 10,
                borderWidth: 0.5,
                marginTop: 10,
                paddingHorizontal: 10
              }}
              multiline={true}
              numberOfLines={5}
              maxLength={150}
              value={this.state.descricao}
              onChangeText={descricao => this.setState({ descricao })}
              placeholder={'Insira uma descrição para o produto'}
            />
          </View>

          <View style={{ width: '90%', alignItems: 'flex-start', marginTop: 10 }}>
            <Text style={{ width: '100%', fontSize: 16 }}>Preço</Text>
            <TextInputMask
              style={{ width: '100%', borderColor: '#707070', borderRadius: 10, borderWidth: 0.5, marginTop: 10, paddingHorizontal: 10 }}
              type={'money'}
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$',
                suffixUnit: ''
              }}
              value={this.state.preco}
              onChangeText={preco => this.setState({ preco })}
              placeholder={'Insira um preco para o produto'}
            />
          </View>

          {/** SELECIONAR IMAGEM */}
          <View style={{
            width: '100%',
            alignItems: 'center',
            marginTop: '5%'
          }}>
            <TouchableOpacity style={{
              backgroundColor: 'rgba(0,203,20, 0.82)',
              width: '90%',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              marginBottom: 10
            }} onPress={this.onSelectImage}>
              <Text style={{
                color: '#FFF',
                fontSize: 18,
                textAlign: 'center'
              }}>
                SELECIONE UMA IMAGEM DO PRODUTO
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              style={{
                width: '100%',
                height: Dimensions.get('screen').width * 2 / 4
              }}
              resizeMode={'contain'}
              source={(this.state.imagem == null) ? require('../../../assets/images/logo_vazio.png') : this.state.imagem}
            />
          </View>

          <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Checkbox
              status={status ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ status: !status }); }}
            />
            <Text>Produto ativado</Text>
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
                {this.state.idproduto > 0 ? 'ALTERAR' : 'CADASTRAR'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }
};

const mapStateToProps = (state) => ({
  dataUsuario: state.UsuarioReducer,
  dataProduto: state.ProdutoReducer,
  dataCategoria: state.CategoriaReducer,
  dataEmpresa: state.EmpresaReducer
})

export default connect(mapStateToProps)(CadastroProduto);