import axios from 'axios';

export const login = (responseBody) => {
    const body = { 
        email: responseBody.email,
        password: responseBody.password,
    };
    return axios.post('http://localhost:3001/auth/login', body);
}

export const createUser = (responseBody) => {
    return axios.post('http://localhost:3001/users', responseBody).then(data => {
        return data;
    });   
}