import { useState } from "react";

export default function useToken(){

    const getToken = () => {
        const token = localStorage.getItem('accessToken');
        const userToken = JSON.parse(token);
        return userToken?.AccessToken;
    };

    const [accessToken, setAccessToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('accessToken', JSON.stringify(userToken));
        setAccessToken(userToken.AccessToken)
    }

    return {
        setToken: saveToken,
        accessToken
    }
}