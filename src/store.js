import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './Redux/Reducers'
import { compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


// const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)))

// // const store = createStore(player)

// export default store;

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['players'],
    stateReconciler: autoMergeLevel2,
  };

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(pReducer, composeEnhances(applyMiddleware(thunk)))

export const persistor = persistStore(store);

export default store;