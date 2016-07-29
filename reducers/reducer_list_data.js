import {FETCH_LIST_DATA, LIST_DATA_REQUEST, LIST_DATA_RESPONSE} from '../actions/action_list_data';

const initialState = {isFetching: false, isCompleted: false};
function listDataReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_LIST_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                isCompleted: true,
                listData: action.listData
            });

        case LIST_DATA_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isCompleted: true
            });

        case LIST_DATA_RESPONSE:
            return Object.assign({}, state, {
                isFetching: false,
                isCompleted: true,
                listData: action.listData
            });
    }

    return state;
}

export default listDataReducer;
