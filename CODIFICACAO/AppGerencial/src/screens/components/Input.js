import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'

class Input extends Component {
    render() {
        return (
            <View style={Styles.containerInput} >
                <Text style={Styles.textInputStyle} >{this.props.nome}</Text>
                {
                    !(this.props.mask) &&
                    <TextInput style={Styles.inputStyle} {...this.props}/>
                }
                {
                    (this.props.mask) &&
                    <TextInputMask style={Styles.inputStyle} {...this.props}/>
                }
            </View>
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
    }
})

export default Input;