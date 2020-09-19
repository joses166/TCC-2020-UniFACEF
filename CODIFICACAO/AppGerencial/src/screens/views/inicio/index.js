import React, { Component } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import Styles from './style'
import Carregando from '../../components/Carregando'

class Inicio extends Component {

  render() {
    return (
      <View style={Styles.container}>

        <Avatar.Image size={Dimensions.get('screen').width * 2 / 5} source={require('../../../assets/images/doctor.png')} />
        
        <Text style={Styles.titleApp}>MARQFACIL</Text>

        <View style={Styles.containerButton}>
          <TouchableOpacity style={Styles.buttonContainer} onPress={() => this.props.navigation.navigate("Empresa")}>
            <Text style={Styles.buttonTitle}>
              CADASTRAR EMPRESAS
          </Text>
          </TouchableOpacity>

          <TouchableOpacity style={Styles.buttonContainer} onPress={() => this.props.navigation.navigate("ListaEmpresas")}>
            <Text style={Styles.buttonTitle}>
              LISTAR EMPRESAS CADASTRADAS
          </Text>
          </TouchableOpacity>
        </View>

        <Carregando />

      </View>
    )
  }

}

export default Inicio;