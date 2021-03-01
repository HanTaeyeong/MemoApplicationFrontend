import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import write from './write';


const rootReducer = combineReducers({
    auth, loading, write
})

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;