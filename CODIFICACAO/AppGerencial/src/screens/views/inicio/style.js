import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleApp: {
        fontSize: 22,
        marginVertical: 10
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