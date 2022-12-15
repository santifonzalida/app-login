import axios from 'axios';

export const getUsers = (token) => {
    return axios.get('http://192.168.100.23:3001/users', {headers: {"Authorization": `Bearer ${token}`}})
        .then((data) => {
            return data.data.data;
        }
    );
}
