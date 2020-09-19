import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';

class Confirmation extends Component {

  render() {
    return (
      <ScrollView>
        <View style={Styles.container}>
          <Avatar.Image size={Dimensions.get('screen').width * 2 / 5} source={require('../../../assets/images/correct.png')} />
          <Text style={Styles.titleApp}>Seu cadastro foi finalizado com sucesso. Agora você já pode utilizar o aplicativo a partir do usuário cadastrado!</Text>
          <View style={Styles.containerButton}>
            <TouchableOpacity style={Styles.buttonContainer} onPress={() => this.props.navigation.navigate("Inicio")}>
              <Text style={Styles.buttonTitle}>
                VOLTAR PARA TELA INICIAL
              </Text>
            </TouchableOpacity>
          </View>
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
    marginTop: '5%',
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
  }
})

export default Confirmation;