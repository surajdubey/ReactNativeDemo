import {LOGIN_REQUEST, LOGIN_RESPONSE} from '../actions/index';

const initialState = {isFetching: false, isCompleted: false}
export default function(state=initialState, action) {

    switch (action.type) {

        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case LOGIN_RESPONSE:
            console.log(action.responseData);
            return Object.assign({}, state, {
                isFetching: false,
                isCompleted: true,
                responseData: action.responseData
            })

        default:
            return state;
    }
}
