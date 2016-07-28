import {LOGIN_REQUEST, LOGIN_RESPONSE} from '../actions/index';

export default function(state=[], action) {
    switch (action.type) {
        // case LOGIN_REQUEST:
        //     JSON.stringify(action.payload.json())
        //     console.log("Response received ", );
        //     return Object.assign({}, state, action.payload);

        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case LOGIN_RESPONSE:
            console.log(action.responseData);
            return Object.assign({}, state, {
                isFetching: false,
                responseData: action.responseData
            })

        default:
            return state;
    }
}
