import {FETCH_LIST_DATA, LIST_DATA_REQUEST, LIST_DATA_RESPONSE,
        DELETE_LIST_DATA_REQUEST, DELETE_LIST_DATA_RESPONSE} from '../actions/action_list_data';

const initialState = {isFetching: false, isCompleted: false,
                    isFetchingForDeletion: false, isCompletedForDeletion: false};
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

        case DELETE_LIST_DATA_REQUEST:
            return Object.assign({}, state, {
                isFetchingForDeletion: true,
                isCompletedForDeletion: false
            });

        case DELETE_LIST_DATA_RESPONSE:
            return Object.assign({}, state, {
                isFetchingForDeletion: false,
                isCompletedForDeletion: true,
                deleteResponseData: action.responseData,
                rowIDToDelete: action.rowIDToDelete
            });
    }

    return state;
}

export default listDataReducer;
