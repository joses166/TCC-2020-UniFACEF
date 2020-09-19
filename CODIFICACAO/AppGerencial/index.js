import React from 'react'
import { AppRegistry } from 'react-native';
import Navigator from './src/Navigator';
import { name as appName } from './app.json';
// Provider React Native Paper
import { Provider as PaperProvider } from 'react-native-paper'
// React Navigation
import 'react-native-gesture-handler';
// Redux
import { Provider as StoreProvider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './src/data/reducers'
import thunkMiddleware from 'redux-thunk'
// Configurando Redux
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default function Main() {
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <Navigator />
            </PaperProvider>
        </StoreProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);