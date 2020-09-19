import React, { Component } from 'react'

import { Portal, Modal, ActivityIndicator } from 'react-native-paper'
import { connect } from 'react-redux'

class Carregando extends Component {
    render() {
        return (
            <Portal>
                <Modal visible={this.props.dataCarregando.loading}>
                    <ActivityIndicator
                        animating={true}
                        color={"#FFFFFF"}
                        size={50}
                    />
                </Modal>
            </Portal>
        )
    }
}

const mapStateToProps = (state) => ({
    dataCarregando: state.CarregandoReducer
})

export default connect(mapStateToProps)(Carregando)