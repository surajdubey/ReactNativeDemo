import { combineReducers } from 'redux';
import LoginReducer from './reducer_login';
import listDataReducer from './reducer_list_data';

const rootReducer = combineReducers({
    loginResponseData: LoginReducer,
    listDataResponse: listDataReducer
});

export default rootReducer;
