import React, { Component } from "react";
import { Card, Divider } from "react-native-paper";
import { TouchableOpacity, View, Image, Text } from "react-native";

class CardEmpresa extends Component {
    render() {
        return (
            <Card style={{ width: '100%', shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, marginBottom: 10 }}>
                <Card.Content style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={this.props.onClick}>
                        <Text style={{ width: '90%', textAlign: 'justify', fontSize: 16, fontWeight: 'bold' }}>{this.props.razaosocial}</Text>
                    </TouchableOpacity>
                    <Divider style={{ width: '90%', marginVertical: 10 }} />
                    <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ width: '10%', marginRight: 20 }} onPress={this.props.onEdit}>
                            <Image source={require('../../assets/images/edit.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '10%' }} onPress={this.props.onDelete}>
                            <Image source={require('../../assets/images/close.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card >
        )
    }
}

export default CardEmpresa