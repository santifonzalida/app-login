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

export const editProfile = (data, token) => {
    const user = { 
        avatarUrl: data.avatarUrl,
        email:data.email,
        fullName: data.fullName,
        notes: data.notes
    }
    return axios.put(`http://192.168.100.23:3001/users/${data._id}`, user, {headers: {"Authorization": `Bearer ${token}`}})
        .then((data) => {
            return data.data.data;
        }
    );
}