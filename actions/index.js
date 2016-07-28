import config from '../config';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";

function loginRequest(username, password) {
    return {
        type: LOGIN_REQUEST,
        payload: {username: username, password: password}
    }
}

function loginResponse(responseData) {
    return {
        type: LOGIN_RESPONSE,
        responseData: responseData
    }
}

export function fetchLoginResponse(username, password) {
    return function(dispatch) {
        dispatch(loginRequest(username, password));

        const API_ENPOINT = `${config.END_POINT}login`;
        return fetch(API_ENPOINT, {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body:
              JSON.stringify({
              username: username,
              password: password
            })
        })
        .then((response) => response.json())
        .then((responseData) => handleLoginResponse(responseData, dispatch));
    }
}

function handleLoginResponse(responseData, dispatch) {
    console.log('inside promise ' + JSON.stringify(responseData));
    dispatch(loginResponse(responseData));
}
