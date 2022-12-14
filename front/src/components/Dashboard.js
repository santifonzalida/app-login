import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if(!token) {
            navigate("/Auth")
        }
        setAccessToken(token)
    },[])


    return (
        <div>
            <h3>Dashboard COMPONENT</h3>
            <p>token: {accessToken}</p>
        </div>
    )

}