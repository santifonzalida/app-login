import axios from 'axios';

export const getUsers = (token) => {
    return axios.get('http://192.168.100.23:3001/users', {headers: {"Authorization": `Bearer ${token}`}})
        .then((data) => {
            return data.data.data;
        }
    );
}

export const getUSerById = (userId, token) => {
    return axios.get(`http://192.168.100.23:3001/users/${userId}`, {headers: {"Authorization": `Bearer ${token}`}})
        .then((data) => {
            return data.data.data;
        }
    );
}

export const editProfile = (user, token) => {
    const data = { user };
    return axios.put(`http://192.168.100.23:3001/users/${user._id}`, data, {headers: {"Authorization": `Bearer ${token}`}})
        .then((data) => {
            return data.data.data;
        }
    );
}