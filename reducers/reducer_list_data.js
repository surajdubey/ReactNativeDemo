function listDataReducer(state, action) {
    switch(action.type) {
        case FETCH_LIST_DATA:
            return Object.assign({}, state,
                isFetching: true,
                isCompleted: true,
                listData: action.listData
            );

        case LIST_DATA_REQUEST:
            return ;

        case LIST_DATA_RESPONSE:
            return ;
    }

    return state;
}
