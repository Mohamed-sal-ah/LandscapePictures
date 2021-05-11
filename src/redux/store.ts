import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { Platform } from 'react-native'
const inizialState: any = {}
const middleWare = [thunk]
let allStore
if (Platform.OS === "web" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) {
    allStore = createStore(rootReducer, inizialState, compose(
        applyMiddleware(...middleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))
} else {
    allStore = createStore(rootReducer, inizialState, compose(
        applyMiddleware(...middleWare)
    ))
}


export const store = allStore
export const persistor = persistStore(store)