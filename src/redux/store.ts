import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
const inizialState: any = {}
const middleWare = [thunk]

//Create Store
const allStore = createStore(rootReducer, inizialState, compose(
    applyMiddleware(...middleWare)
))


export const store = allStore
export const persistor = persistStore(store)