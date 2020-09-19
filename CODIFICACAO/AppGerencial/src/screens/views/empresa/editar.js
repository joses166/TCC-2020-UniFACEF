import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux'
import * as EmailValidator from 'email-validator';
import ImagePicker from 'react-native-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as EmpresaActions from '../../../data/actions/EmpresaAction';
import * as EnderecoActions from '../../../data/actions/EnderecoAction';
import * as CarregandoActions from '../../../data/actions/CarregandoAction';
import Input from '../../components/Input';
import TopMenu from '../../components/TopMenu';

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

const { cpf, cnpj } = require('cpf-cnpj-validator');

class Empresa extends Component {

  state = {
    idempresa: null,
    empresa: {
      razaosocial: '',
      cpfcnpj: '',
      nomefantasia: '',
      telefone: '',
      email: '',
      celular: '',
      endereco: {
        rua: '',
        numero: null,
        cep: '',
        bairro: '',
        complemento: '',
        cidade: '',
        estado: ''
      },
      logo: null
    },
    typeinput: 'cpf'
  }

  componentDidMount() {
    this.onInsertCPForCNPJ(this.props.dataempresa.editempresa.cpfcnpj)

    this.setState({
      idempresa: this.props.dataempresa.editempresa.idempresa,
      empresa: {
        ...this.props.dataempresa.editempresa,
        logo: this.props.dataempresa.editempresa.logo == null ? null : { uri: 'data:image/jpeg;base64,' + this.props.dataempresa.editempresa.logo },
        endereco: {
          ...this.props.dataempresa.editempresa.endereco,
          numero: `${this.props.dataempresa.editempresa.endereco.numero}`
        }
      }
    })
  }

  onSelectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error || response.customButton) {
        Alert.alert("Atenção", "Pode ter ocorrido algum problema com sua foto.")
      } else {
        this.setState({ empresa: { ...this.state.empresa, logo: response } })
      }
    })
  }

  onCepCompleted = async () => {
    const cep = this.state.empresa.endereco.cep.replace('\n-', '').replace('.', '')
    await this.props.dispatch(CarregandoActions.loading())
    await this.props.dispatch(EnderecoActions.getEndereco(cep))
    await this.props.dispatch(CarregandoActions.notLoading())
    const enderecocompleto = JSON.parse(this.props.dataEndereco.endereco)

    if (!enderecocompleto.erro) {
      this.setState({
        empresa: {
          ...this.state.empresa,
          endereco: {
            ...this.state.empresa.endereco,
            rua: enderecocompleto.logradouro,
            bairro: enderecocompleto.bairro,
            cidade: enderecocompleto.localidade,
            estado: enderecocompleto.uf
          }
        }
      })
    } else {
      Alert.alert('Erro', 'O CEP digitado é inválido')
    }
  }

  onClickAlterar = async () => {
    let msg = ''
    const validarcampos = this.state.empresa

    if (!(validarcampos.razaosocial.trim().length > 0) || (validarcampos.razaosocial.trim() == '')) { msg += '\n- Razão Social;' }
    if (!(validarcampos.cpfcnpj.trim().length > 0) || (validarcampos.cpfcnpj.trim() == '')) { msg += '\n- CPF / CNPJ;' }
    if (!(validarcampos.nomefantasia.trim().length > 0) || (validarcampos.nomefantasia.trim() == '')) { msg += '\n- Nome Fantasia;' }
    if (!(validarcampos.telefone.trim().length > 0) || (validarcampos.telefone.trim() == '')) { msg += '\n- Telefone;' }
    if (!(validarcampos.email.trim().length > 0) || (validarcampos.email.trim() == '')) { msg += '\n- Email;' }
    if (!(validarcampos.endereco.rua.trim().length > 0) || (validarcampos.endereco.rua.trim() == '')) { msg += '\n- Rua;' }
    if (!(validarcampos.endereco.numero.length > 0) || (validarcampos.endereco.numero == null) || (validarcampos.endereco.numero <= 0)) { msg += '\n- Número;' }
    if (!(validarcampos.endereco.cep.trim().length > 0) || (validarcampos.endereco.cep.trim() == '')) { msg += '\n- CEP;' }
    if (!(validarcampos.endereco.bairro.trim().length > 0) || (validarcampos.endereco.bairro.trim() == '')) { msg += '\n- Bairro;' }
    if (!(validarcampos.endereco.cidade.trim().length > 0) || (validarcampos.endereco.cidade.trim() == '')) { msg += '\n- Cidade;' }
    if (!(validarcampos.endereco.estado.trim().length > 0) || (validarcampos.endereco.estado.trim() == '')) { msg += '\n- Estado;' }

    let dadosEmpresa = {
      ...validarcampos,
      telefone: validarcampos.telefone.replace(/[^\d]+/g, ''),
      celular: validarcampos.celular.replace(/[^\d]+/g, ''),
      cpfcnpj: validarcampos.cpfcnpj.replace(/[^\d]+/g, ''),
      endereco: {
        ...validarcampos.endereco,
        cep: validarcampos.endereco.cep.replace(/[^\d]+/g, ''),
        numero: validarcampos.endereco.numero.replace(/[^\d]+/g, '')
      }
    }

    // Fazer condição que verifica cpf ou cnpj
    if (dadosEmpresa.cpfcnpj.length > 0 && dadosEmpresa.cpfcnpj.length <= 11) {
      if (!cpf.isValid(dadosEmpresa.cpfcnpj)) {
        msg += '\n- CPF é inválido;';
      }
    } else if (dadosEmpresa.cpfcnpj.length > 0) {
      if (!cnpj.isValid(dadosEmpresa.cpfcnpj)) {
        msg += '\n- CNPJ é inválido;';
      }
    }

    // Verificando se o email é válido
    if (dadosEmpresa.email.length > 0) {
      if (!EmailValidator.validate(dadosEmpresa.email)) {
        msg += '\n- Email é inválido;';
      }
    }

    // Verificando celular e telefone
    if (dadosEmpresa.telefone.length > 0) {
      if (!(dadosEmpresa.telefone.length == 10)) {
        msg += '\n- Telefone deve conter 10 dígitos;'
      }
    }
    if (dadosEmpresa.celular.length > 0) {
      if (!(dadosEmpresa.celular.length == 10 || dadosEmpresa.celular.length == 11)) {
        msg += '\n- Celular deve conter 10 ou 11 dígitos;'
      }
    }

    // Verificando tamanho da imagem
    if (dadosEmpresa.logo && dadosEmpresa.logo != null) {
      if (!(dadosEmpresa.logo.uri.indexOf("data:image/jpeg;base64,") >= 0)) {
        if (dadosEmpresa.logo != null) {
          if (dadosEmpresa.logo.fileSize > 2000000) {
            msg += '\n- A imagem deve ser menor que 2MB;'
          }

          if (dadosEmpresa.logo.type != 'image/jpeg') {
            if (dadosEmpresa.logo.type != 'image/png') {
              msg += '\n- A imagem deve ser do tipo jpg ou png;'
            }
          }

          dadosEmpresa = {
            ...dadosEmpresa,
            logo: dadosEmpresa.logo.data
          }
        }
      } else {
        const logodata = dadosEmpresa.logo.uri.replace('data:image/jpeg;base64,', '')

        dadosEmpresa = {
          ...dadosEmpresa,
          logo: logodata
        }
      }
    }

    // Condição que analisa se deve ser informado algo ou não
    if (msg.trim().length > 0) {
      msg = `Necessário informar os seguintes campos: \n${msg}`
      Alert.alert("Atenção", msg)
    } else {
      const idempresa = this.state.idempresa
      if (idempresa > 0) {
        await this.props.dispatch(CarregandoActions.loading())
        await this.props.dispatch(EmpresaActions.updateEmpresa(idempresa, dadosEmpresa))
        await this.props.dispatch(CarregandoActions.notLoading())
        this.props.navigation.navigate("ListaEmpresas")
      } else {
        Alert.alert(`Atenção`, `A empresa editada não possui um id.`)
      }
    }
  }

  onInsertCPForCNPJ = (cpfcnpj) => {
    this.setState({ empresa: { ...this.state.empresa, cpfcnpj } })
    const typeinput = cpfcnpj.replace(/[^\d]+/g, '').length <= 11 ? '999.999.999-999' : '99.999.999/9999-99'
    this.setState({ typeinput })
  }


  render() {
    return (
      <ScrollView>

        <TopMenu
          onPress={() => this.props.navigation.navigate("ListaEmpresas")}
          topPage={'EDITAR EMPRESA'}
        />

        {/** INPUT RAZÃO SOCIAL */}
        <Input
          value={this.state.empresa.razaosocial}
          onChangeText={razaosocial => this.setState({ empresa: { ...this.state.empresa, razaosocial } })}
          nome={'Razão Social'}
          placeholder={'Informe a Razão Social'}
          maxLength={80}
        />

        {/** INPUT NOME FANTASIA */}
        <Input
          value={this.state.empresa.nomefantasia}
          onChangeText={nomefantasia => this.setState({ empresa: { ...this.state.empresa, nomefantasia } })}
          nome={'Nome Fantasia'}
          placeholder={'Informe o Nome Fantasia'}
          maxLength={80}
        />

        {/** INPUT CNPJ / CPF */}
        <Input nome={'CNPJ / CPF'}
          mask
          type={'custom'}
          keyboardType={'decimal-pad'}
          options={{
            mask: this.state.typeinput
          }}
          value={this.state.empresa.cpfcnpj}
          onChangeText={cpfcnpj => this.onInsertCPForCNPJ(cpfcnpj)}
          placeholder={'Informe o CNPJ / CPF'}
        />

        {/** INPUT TELEFONE */}
        <Input
          nome={'Telefone'}
          mask
          type={'custom'}
          keyboardType={'decimal-pad'}
          options={{
            mask: '(99) 9999-9999'
          }}
          value={this.state.empresa.telefone}
          onChangeText={telefone => { this.setState({ empresa: { ...this.state.empresa, telefone } }) }}
          placeholder={'Informe o Telefone'}
        />

        {/** INPUT CELULAR */}
        <Input
          nome={'Celular'}
          mask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          value={this.state.empresa.celular}
          onChangeText={celular => { this.setState({ empresa: { ...this.state.empresa, celular } }) }}
          placeholder={'Informe o Celular'}
        />

        {/** INPUT EMAIL */}
        <Input
          value={this.state.empresa.email}
          onChangeText={email => this.setState({ empresa: { ...this.state.empresa, email } })}
          nome={'Email'}
          placeholder={'Informe o Email'}
          maxLength={120}
          type={'email'}
        />

        {/** SELECIONAR IMAGEM */}
        <View style={Styles.containerInput}>
          <TouchableOpacity style={Styles.selectPhoto} onPress={this.onSelectImage}>
            <Text style={Styles.titleSelectPhoto}>
              SELECIONE A LOGO DA EMPRESA
              </Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.containerCenter}>
          <Image
            style={Styles.logo}
            resizeMode={'contain'}
            source={this.state.empresa.logo != null ? this.state.empresa.logo : require('../../../assets/images/logo_vazio.png')}
          />
        </View>

        {/** LINHA DE DIVISÃO */}
        <View style={[Styles.containerCenter, { marginVertical: 20 }]}>
          <Divider style={Styles.line} />
        </View>

        {/** TÍTULO PARTE DO ENDEREÇO */}
        <View style={Styles.containerCenter}>
          <Text style={{ fontSize: 18, color: '#707070' }}>INSIRA OS DADOS DE ENDEREÇO</Text>
        </View>

        {/** INPUT CEP */}
        <View style={Styles.containerInput} >
          <Text style={Styles.textInputStyle} >CEP</Text>
          <View style={{ width: '90%' }}>
            <View style={{ borderWidth: 0.5, borderRadius: 10, borderColor: '#707070', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TextInputMask
                mask
                type={'custom'}
                keyboardType={'decimal-pad'}
                options={{
                  mask: '99.999-999'
                }}
                value={this.state.empresa.endereco.cep}
                onChangeText={cep => this.setState({ empresa: { ...this.state.empresa, endereco: { ...this.state.empresa.endereco, cep } } })}
                style={{ paddingHorizontal: 10, width: '85%' }}
                placeholder={'Informe o CEP'}
                onBlur={this.onCepCompleted}
              />
              <TouchableOpacity onPress={this.onCepCompleted}>
                <Icon name={'search'} size={25} color={'#707070'} style={{ padding: 5 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/** INPUT RUA */}
        <Input
          value={this.state.empresa.endereco.rua}
          onChangeText={rua => this.setState({ empresa: { ...this.state.empresa, endereco: { ...this.state.empresa.endereco, rua } } })}
          nome={'Rua'}
          placeholder={'Informe a Rua'}
          editable={false}
        />

        {/** INPUT NÚMERO */}
        <Input
          value={this.state.empresa.endereco.numero}
          onChangeText={numero => {
            numero = numero.replace(/[^\d]+/g, '')
            this.setState({ empresa: { ...this.state.empresa, endereco: { ...this.state.empresa.endereco, numero } } })
          }
          }
          nome={'Número'}
          placeholder={'Informe o Número'}
          keyboardType={'decimal-pad'}
        />

        {/** INPUT BAIRRO */}
        <Input
          value={this.state.empresa.endereco.bairro}
          onChangeText={bairro => this.setState({ empresa: { ...this.state.empresa, endereco: { ...this.state.empresa.endereco, bairro } } })}
          nome={'Bairro'}
          placeholder={'Informe o Bairro'}
          editable={false}
        />

        {/** INPUT COMPLEMENTO */}
        <Input
          value={this.state.empresa.endereco.complemento}
          onChangeText={complemento => this.setState({ empresa: { ...this.state.empresa, endereco: { ...this.state.empresa.endereco, complemento } } })}
          nome={'Complemento'}
          placeholder={'Informe o Complemento'}
        />

        {/** INPUT CIDADE */}
        <Input
          value={this.state.empresa.endereco.cidade}
          onChangeText={cidade => this.setState({ empresa: { ...this.state.empresa, endereco: { ...this.state.empresa.endereco, cidade } } })}
          nome={'Cidade'}
          placeholder={'Informe a Cidade'}
          editable={false}
        />

        {/** INPUT ESTADO */}
        <Input
          value={this.state.empresa.endereco.estado}
          onChangeText={estado => this.setState({ empresa: { ...this.state.empresa, endereco: { ...this.state.empresa.endereco, estado } } })}
          nome={'Estado'}
          placeholder={'Informe o Estado'}
          editable={false}
        />

        <View style={Styles.containerButtons}>
          <TouchableOpacity style={[Styles.buttonStyle, { backgroundColor: '#FF0909' }]} onPress={() => this.props.navigation.navigate("ListaEmpresas")}>
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
              VOLTAR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Styles.buttonStyle, { backgroundColor: 'rgba(0,203,20, 0.82)' }]} onPress={this.onClickAlterar}>
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
              CADASTRAR
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    )
  }

}

const Styles = StyleSheet.create({
  containerInput: {
    width: '100%',
    alignItems: 'center',
    marginTop: '5%'
  },
  textInputStyle: {
    alignItems: 'flex-start',
    width: '90%',
    fontSize: 17,
    color: '#707070',
    marginBottom: 5
  },
  inputStyle: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#707070',
    width: '90%',
    paddingHorizontal: 10
  },
  selectPhoto: {
    backgroundColor: 'rgba(0,203,20, 0.82)',
    width: '90%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  titleSelectPhoto: {
    color: '#FFF',
    fontSize: 18
  },
  containerCenter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '100%',
    height: Dimensions.get('screen').width * 2 / 4
  },
  blockline: {
    marginVertical: 30,
    width: '100%',
    alignItems: 'center'
  },
  line: {
    width: '90%'
  },
  buttonStyle: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40
  },
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10
  }
})

const mapStateToProps = (state) => ({
  dataempresa: state.EmpresaReducer
})

export default connect(mapStateToProps)(Empresa);