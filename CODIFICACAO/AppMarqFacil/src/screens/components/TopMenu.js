import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

class TopMenu extends Component {
    render() {
        return (
            <View style={Styles.containerTop}>
                <View style={Styles.containerButtonReturn}>
                    <TouchableOpacity style={Styles.buttonReturn} {...this.props}>
                        <Icon name={'chevron-left'} size={30} color={'#707070'} />
                    </TouchableOpacity>
                    <Text style={Styles.titlePage}>{this.props.topPage}</Text>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
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
    }
})

export default TopMenu;