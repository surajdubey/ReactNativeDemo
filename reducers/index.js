import { combineReducers } from 'redux';
import LoginReducer from './reducer_login';

const rootReducer = combineReducers({
    loginResponseData: LoginReducer
});

export default rootReducer;
