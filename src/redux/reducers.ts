import { persistCombineReducers } from 'redux-persist'
import databaseReducer from './data/reducers'
import { DatabaseState } from './data'
import AuthReducer from './auth/reducers'
import { AuthState } from './auth'
import AsyncStorage from '@react-native-community/async-storage'

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage,
}

export type MainState = {
    data: DatabaseState,
    auth: AuthState
}

export default persistCombineReducers<MainState>(persistConfig, {
    data: databaseReducer,
    auth: AuthReducer
})