import { combineReducers } from 'redux'

import CarregandoReducer from './CarregandoReducer'
import EmpresaReducer from './EmpresaReducer'
import EnderecoReducer from './EnderecoReducer'
import UsuarioReducer from './UsuarioReducer'

export default combineReducers({
    CarregandoReducer,
    EmpresaReducer,
    EnderecoReducer,
    UsuarioReducer
})