import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import auth from './auth';
import loading from './loading';
import write from './write';

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['auth', 'loading', 'write']
}

const rootReducer = combineReducers({
    auth, loading, write
})

export type RootStateType = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);