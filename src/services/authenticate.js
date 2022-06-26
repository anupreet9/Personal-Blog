import info from './common';

export async function sendToLogin(loginInfo) {
    const response = await fetch(`${info.proxy}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        },
        body: JSON.stringify({ username: loginInfo.username, password: loginInfo.password }),
    })
    const body = await response.json();
    return body;
}

export async function sendToRegister(registerInfo) {
    const response = await fetch(`${info.proxy}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        },
        body: JSON.stringify({ username: registerInfo.username, password: registerInfo.password }),
    })
    const body = await response.json();
    return body;
}

export async function logout() {
    const response = await fetch(`${info.proxy}/api/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json());
    return response;
}

export async function authenticate() {
    const response = await fetch(`${info.proxy}/api/authenticate`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${info.token}`
        }
    })
        .then(data => data.json());
    return response;
}


