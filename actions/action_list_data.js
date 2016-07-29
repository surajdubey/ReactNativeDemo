import config from '../config';
export const FETCH_LIST_DATA = 'FETCH_LIST_DATA';
export const LIST_DATA_REQUEST = 'LIST_DATA_REQUEST';
export const LIST_DATA_RESPONSE = 'LIST_DATA_RESPONSE';

function listDataRequest(accessToken) {
    return {
        type: LIST_DATA_REQUEST,
        payload: accessToken
    }
}

function listDataResponse(listData) {
    return {
        type: LIST_DATA_RESPONSE,
        listData: listData
    }
}

export function fetchListData(accessToken) {
    return function(dispatch) {
        dispatch(listDataRequest(accessToken));

        const url = `${config.END_POINT}dummy_list_data`;

        return fetch(url, {
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseData) => handleListDataResponse(responseData, dispatch));
    }
}


function handleListDataResponse(responseData, dispatch) {
    console.log('List Data response is ' + responseData);
    dispatch(listDataResponse(responseData));
}
