import * as EmailValidator from 'email-validator';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as EnderecoActions from '../../../data/actions/EnderecoAction';
import * as UsuarioActions from '../../../data/actions/UsuarioAction';
import Input from '../../components/Input';
import * as CarregandoActions from '../../../data/actions/CarregandoAction'
import TopMenu from '../../components/TopMenu';

const { cpf } = require('cpf-cnpj-validator');

class NewUser extends Component {
  state = {
    usuario: {
      nomecompleto: '',
      rg: '',
      cpf: '',
      telefone: '',
      celular: '',
      email: '',
      endereco: {
        cep: '',
        rua: '',
        numero: null,
        bairro: '',
        complemento: '',
        cidade: '',
        estado: ''
      },
      usuario: '',
      senha: '',
      confirmarsenha: '',
      idempresa: null
    }
  }

  // Método que completa os dados após o cep ser inserido
  onCepCompleted = async () => {
    const cep = this.state.usuario.endereco.cep.replace('-', '').replace('.', '')
    if (cep.length == 8) {
      await this.props.dispatch(CarregandoActions.loading())
      await this.props.dispatch(EnderecoActions.getEndereco(cep))
      await this.props.dispatch(CarregandoActions.notLoading())
      const enderecocompleto = JSON.parse(this.props.dataEndereco.endereco)
      if (!enderecocompleto.erro) {
        this.setState({
          usuario: {
            ...this.state.usuario,
            endereco: {
              ...this.state.usuario.endereco,
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
    } else {
      Alert.alert('Erro', 'O CEP digitado é inválido')
    }
  }

  // Metodo para cadastrar um usuário principal para a nova empresa
  onClickCadastrar = async () => {
    let msg = ''
    const validarcampos = this.state.usuario

    if (!(validarcampos.nomecompleto.trim().length > 0) || (validarcampos.nomecompleto.trim() == '')) { msg += '\n- Nome completo;' }
    if (!(validarcampos.rg.trim().length > 0) || (validarcampos.rg.trim() == '')) { msg += '\n- RG;' }
    if (!(validarcampos.cpf.trim().length > 0) || (validarcampos.cpf.trim() == '')) { msg += '\n- CPF;' }
    if (!(validarcampos.celular.trim().length > 0) || (validarcampos.celular.trim() == '')) { msg += '\n- Celular;' }
    if (!(validarcampos.email.trim().length > 0) || (validarcampos.email.trim() == '')) { msg += '\n- Email;' }
    if (!(validarcampos.endereco.rua.trim().length > 0) || (validarcampos.endereco.rua.trim() == '')) { msg += '\n- Rua;' }
    if (!(validarcampos.endereco.numero.length > 0) || (validarcampos.endereco.numero == null) || (validarcampos.endereco.numero <= 0)) { msg += '\n- Número;' }
    if (!(validarcampos.endereco.cep.trim().length > 0) || (validarcampos.endereco.cep.trim() == '')) { msg += '\n- CEP;' }
    if (!(validarcampos.endereco.bairro.trim().length > 0) || (validarcampos.endereco.bairro.trim() == '')) { msg += '\n- Bairro;' }
    if (!(validarcampos.endereco.cidade.trim().length > 0) || (validarcampos.endereco.cidade.trim() == '')) { msg += '\n- Cidade;' }
    if (!(validarcampos.endereco.estado.trim().length > 0) || (validarcampos.endereco.estado.trim() == '')) { msg += '\n- Estado;' }

    const dadosUsuario = {
      ...validarcampos,
      telefone: validarcampos.telefone.replace(/[^\d]+/g, ''),
      celular: validarcampos.celular.replace(/[^\d]+/g, ''),
      cpf: validarcampos.cpf.replace(/[^\d]+/g, ''),
      rg: validarcampos.rg.replace(/[^\dA-Za-z]+/g, ''),
      endereco: {
        ...validarcampos.endereco,
        cep: validarcampos.endereco.cep.replace(/[^\d]+/g, ''),
        numero: validarcampos.endereco.numero.replace(/[^\d]+/g, ''),
      }
    }

    if (dadosUsuario.rg.length != 9) {
      msg += '- RG é inválido;';
    }

    // Fazer condição que verifica cpf ou cnpj
    if (dadosUsuario.cpf.length <= 11) {
      if (!cpf.isValid(dadosUsuario.cpf)) {
        msg += '- CPF é inválido;';
      }
    }

    // Verificando se o email é válido
    if (dadosUsuario.email.length > 0) {
      if (!(EmailValidator.validate(dadosUsuario.email))) {
        msg += '- Email é inválido;';
      }
    }

    // Verificando celular e telefone
    if (dadosUsuario.telefone.length > 0) {
      if (!(dadosUsuario.telefone.length == 10)) {
        msg += '- Telefone deve conter 10 dígitos;'
      }
    }
    if (dadosUsuario.celular.length > 0) {
      if (!(dadosUsuario.celular.length == 10 || dadosUsuario.celular.length == 11)) {
        msg += '- Celular deve conter 10 ou 11 dígitos;'
      }
    }

    // Verificar se as senhas são iguais
    if (dadosUsuario.senha != null && dadosUsuario.senha.trim().length > 0) {
      if (dadosUsuario.senha != dadosUsuario.confirmarsenha) {
        msg += '- As senhas devem ser iguais;'
      }
    }

    // Verificar se a data de nascimento é válida e inferior a data atual
    var datanascimento = dadosUsuario.datanascimento
    const validardata = moment(datanascimento, "DD/MM/YYYY").isValid()

    if (validardata) {
      datanascimento = moment(datanascimento, "DD/MM/YYYY").format('YYYY-MM-DD')
      var dataatual = moment();
      dataatual = dataatual.tz('America/Sao_Paulo').format('YYYY-MM-DD')
      var verify = moment(datanascimento).isBefore(dataatual)
      if (!verify) {
        msg += "\n - A data inserida deve ser anterior a data atual"
      }
    } else {
      msg += "\n - A data inserida não é válida"
    }

    // Condição que analisa se deve ser informado algo ou não
    if (msg.trim().length > 0) {

      msg = `Necessário informar os seguintes campos: \n${msg}`
      Alert.alert("Atenção", msg)

    } else {

      // Inserindo empresa
      const idempresa = this.props.dataUsuario.id

      const usuario = await {
        ...dadosUsuario,
        tipousuario: "A",
        idempresa,
        datanascimento: datanascimento
      }

      // Inserindo usuário
      await this.props.dispatch(CarregandoActions.loading())
      await this.props.dispatch(UsuarioActions.createUser(usuario))
      await this.props.dispatch(CarregandoActions.notLoading())
      const usuarioInserido = await this.props.dataUsuario.usuario

      if (usuarioInserido != null) {
        this.props.navigation.navigate("InfoUsuario")
      }

    }

  }

  render() {
    return (
      <ScrollView>

        <TopMenu
          onPress={() => this.props.navigation.navigate("Empresa")}
          topPage={'CADASTRO DE USUÁRIO PRINCIPAL'}
        />

        {/** INPUT NOME COMPLETO */}
        <Input
          nome={'Nome Completo'}
          value={this.state.usuario.nomecompleto}
          onChangeText={nomecompleto => this.setState({ usuario: { ...this.state.usuario, nomecompleto } })}
          placeholder={'Informe o Nome Completo'}
          maxLength={80}
        />

        {/** INPUT RG */}
        <Input
          nome={'RG'}
          placeholder={'Informe o RG'}
          mask
          type={'custom'}
          options={{
            mask: '99.999.999-S'
          }}
          value={this.state.usuario.rg}
          onChangeText={rg => this.setState({ usuario: { ...this.state.usuario, rg } })}
        />

        {/** INPUT CPF */}
        <Input
          nome={'CPF'}
          placeholder={'Informe o CPF'}
          mask
          type={'cpf'}
          value={this.state.usuario.cpf}
          onChangeText={cpf => this.setState({ usuario: { ...this.state.usuario, cpf } })}
        />

        {/** INPUT DATA DE NASCIMENTO */}
        <Input
          nome={'Data de Nascimento'}
          placeholder={'Informe a Data de Nascimento'}
          mask
          type={'custom'}
          options={{
            mask: '99/99/9999'
          }}
          keyboardType={'decimal-pad'}
          value={this.state.usuario.datanascimento}
          onChangeText={datanascimento => this.setState({ usuario: { ...this.state.usuario, datanascimento } })}
          onBlur={this.onVerifyDate}
        />

        {/** INPUT TELEFONE */}
        <Input
          nome={'Telefone'}
          placeholder={'Informe o Telefone'}
          mask
          type={'custom'}
          keyboardType={'decimal-pad'}
          options={{
            mask: '(99) 9999-9999'
          }}
          value={this.state.usuario.telefone}
          onChangeText={telefone => this.setState({ usuario: { ...this.state.usuario, telefone } })}
        />

        {/** INPUT CELULAR */}
        <Input
          nome={'Celular'}
          placeholder={'Informe o Celular'}
          mask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) '
          }}
          value={this.state.usuario.celular}
          onChangeText={celular => this.setState({ usuario: { ...this.state.usuario, celular } })}
        />

        {/** INPUT EMAIL */}
        <Input
          nome={'Email'}
          placeholder={'Informe o Email'}
          maxLength={120}
          type={'email'}
          value={this.state.usuario.email}
          onChangeText={email => this.setState({ usuario: { ...this.state.usuario, email } })}
        />

        <View style={[Styles.containerCenter, { marginVertical: 20 }]}>
          <Divider style={Styles.line} />
        </View>

        <View style={Styles.containerCenter}>
          <Text style={{ fontSize: 18, color: '#707070' }}>ENDEREÇO DO USUÁRIO</Text>
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
                value={this.state.usuario.endereco.cep}
                onChangeText={cep => this.setState({ usuario: { ...this.state.usuario, endereco: { ...this.state.usuario.endereco, cep } } })}
                style={{ paddingHorizontal: 10, width: '85%' }}
                placeholder={'Informe o CEP'}
                onBlur={this.onCepCompleted}
              />
              <TouchableOpacity>
                <Icon name={'search'} size={25} color={'#707070'} style={{ padding: 5 }} />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/** INPUT RUA */}
        <Input
          value={this.state.usuario.endereco.rua}
          onChangeText={rua => this.setState({ usuario: { ...this.state.usuario, endereco: { ...this.state.usuario.endereco, rua } } })}
          nome={'Rua'}
          placeholder={'Informe a Rua'}
          editable={false}
        />

        {/** INPUT NÚMERO */}
        <Input
          value={this.state.usuario.endereco.numero}
          onChangeText={numero => {
            numero = numero.replace(/[^\d]+/g, '')
            this.setState({ usuario: { ...this.state.usuario, endereco: { ...this.state.usuario.endereco, numero } } })
          }
          }
          nome={'Número'}
          placeholder={'Informe o Número'}
          keyboardType={'decimal-pad'}
        />

        {/** INPUT BAIRRO */}
        <Input
          value={this.state.usuario.endereco.bairro}
          onChangeText={bairro => this.setState({ usuario: { ...this.state.usuario, endereco: { ...this.state.usuario.endereco, bairro } } })}
          nome={'Bairro'}
          placeholder={'Informe o Bairro'}
          editable={false}
        />

        {/** INPUT COMPLEMENTO */}
        <Input
          value={this.state.usuario.endereco.complemento}
          onChangeText={complemento => this.setState({ usuario: { ...this.state.usuario, endereco: { ...this.state.usuario.endereco, complemento } } })}
          nome={'Complemento'}
          placeholder={'Informe o Complemento'}
        />

        {/** INPUT CIDADE */}
        <Input
          value={this.state.usuario.endereco.cidade}
          onChangeText={cidade => this.setState({ usuario: { ...this.state.usuario, endereco: { ...this.state.usuario.endereco, cidade } } })}
          nome={'Cidade'}
          placeholder={'Informe a Cidade'}
          editable={false}
        />

        {/** INPUT ESTADO */}
        <Input
          value={this.state.usuario.endereco.estado}
          onChangeText={estado => this.setState({ usuario: { ...this.state.usuario, endereco: { ...this.state.usuario.endereco, estado } } })}
          nome={'Estado'}
          placeholder={'Informe o Estado'}
          editable={false}
        />


        <View style={[Styles.containerCenter, { marginVertical: 20 }]}>
          <Divider style={Styles.line} />
        </View>

        <View style={Styles.containerCenter}>
          <Text style={{ fontSize: 18, color: '#707070' }}>CRIE UM USUÁRIO PARA O CLIENTE</Text>
        </View>

        {/** INPUT USUÁRIO */}
        <Input
          placeholder={'Informe o Usuário'}
          nome={'Usuário'}
          value={this.state.usuario.usuario}
          onChangeText={usuario => this.setState({ usuario: { ...this.state.usuario, usuario } })}
          maxLength={20}
        />

        {/** INPUT SENHA */}
        <Input
          placeholder={'Informe a Senha'}
          nome={'Senha'}
          maxLength={16}
          secureTextEntry
          value={this.state.usuario.senha}
          onChangeText={senha => this.setState({ usuario: { ...this.state.usuario, senha } })}
        />

        {/** INPUT CONFIRMAR SENHA */}
        <Input
          placeholder={'Informe a Senha novamente'}
          nome={'Confirmar Senha'}
          maxLength={16}
          secureTextEntry
          value={this.state.usuario.confirmarsenha}
          onChangeText={confirmarsenha => this.setState({ usuario: { ...this.state.usuario, confirmarsenha } })}
        />

        <View style={Styles.containerButtons}>
          <TouchableOpacity style={[Styles.buttonStyle, { backgroundColor: '#FF0909' }]} onPress={() => this.props.navigation.navigate("Empresa")}>
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
              VOLTAR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[Styles.buttonStyle, { backgroundColor: 'rgba(0,203,20, 0.82)' }]} onPress={this.onClickCadastrar}>
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
    height: 40,
    color: '#FFF'
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
  dataEndereco: state.EnderecoReducer,
  dataEmpresa: state.EmpresaReducer,
  dataUsuario: state.UsuarioReducer
})

export default connect(mapStateToProps)(NewUser);