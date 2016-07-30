import config from '../config';
export const FETCH_LIST_DATA = 'FETCH_LIST_DATA';
export const LIST_DATA_REQUEST = 'LIST_DATA_REQUEST';
export const LIST_DATA_RESPONSE = 'LIST_DATA_RESPONSE';
export const DELETE_LIST_DATA_REQUEST = 'DELETE_LIST_DATA_REQUEST';
export const DELETE_LIST_DATA_RESPONSE = 'DELETE_LIST_DATA_RESPONSE';
export const DELETE_LIST_DATA_FROM_STATE = 'DELETE_LIST_DATA_FROM_STATE';

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

function deleteListDataRequest(rowID) {
    return {
        type: 'DELETE_LIST_DATA_REQUEST',
        payload: rowID
    }
}

function deleteListDataResponse(responseData, listData, rowID) {
    return {
        type: 'DELETE_LIST_DATA_RESPONSE',
        responseData: responseData,
        listData: listData,
        rowIDToDelete: rowID
    }
}

export function deleteListData(listData, rowID) {
    return function(dispatch) {
        console.log('rowID inside dispatch is ' + rowID);
        dispatch(deleteListDataRequest(rowID))

        const url = `${config.END_POINT}dummy_ok_request`;

        return fetch(url, {
            method: 'POST'
        })
        .then((response) => response.json())
        .then((responseData) => dispatch(deleteListDataResponse(responseData, listData, rowID)));

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
