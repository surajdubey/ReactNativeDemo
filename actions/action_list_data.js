import config from './config';
export const FETCH_LIST_DATA = 'FETCH_LIST_DATA';

function listDataRequest(accessToken) {
    return {
        type: 'LIST_DATA_REQUEST',
        payload: accessToken
    }
}

function listDataResponse(listData) {
    return {
        type: 'LIST_DATA_RESPONSE',
        listData: listData
    }
}

function handleListDataResponse(responseData) {
    console.log('List Data response is ' + responseData);
    dispatch(listDataResponse(responseData));
}

export function fetchListData(accessToken) {
    return function(dispatch) {
        dispatch(listDataRequest(accessToken));

        const url = `${config.ENDPOINT}dummy_list_data`;

        return fetch(url, {
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseData) => handleListDataResponse(responseData));
    }
}
