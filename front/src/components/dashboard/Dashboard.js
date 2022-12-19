import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';

import { getUsers } from '../../services/users.service';
import './dashboardStyles.css';

export function Dashboard() {
    
    const navigate = useNavigate();
    const [searching, setSearching] = useState(false);
    const [users, setUsers] = useState([]);  
    const [searchInput, setsearchInput] = useState('');

    useEffect(() => {
        setSearching(true);
        const token = JSON.parse(localStorage.getItem('accessToken'));
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(!token) {
            navigate("/Auth");
        }
        getUsers(token)
            .then((data) => {
                setUsers(data);
                setSearching(false);

                let userIndex = data.findIndex(user => user._id == userInfo.userId);
                if(userIndex > -1) {
                    navigate(`/dashboard/profile/${userInfo.userId}`, {state:data[userIndex]})
                }
            })
    },[])

    const searchUser = (event) => {
        event.preventDefault();
    }

    const inputSearchHandler = (event) => {
        const { value } = event.target
        setsearchInput(value);
        console.log(searchInput);
    }

    return (
        <>
            <div id="sidebar">
                <h1> User list</h1>
                <div>
                    <form onSubmit={searchUser} >
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            onChange={(e) => inputSearchHandler(e)}
                        />
                        <div id="search-spinner" aria-hidden hidden={!searching} />
                        <div className="sr-only" aria-live="polite" ></div>
                    </form>
                </div>
                <nav>
                    {users.length ? (
                        <ul>
                            {users.map((user) => (
                                <li key={user._id}>
                                    <NavLink 
                                        to={{pathname: `profile/${user._id}`}}
                                        state={user}
                                        className={({ isActive }) =>
                                            isActive ? "active" : ""
                                        }
                                    >
                                        {user.fullName }
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No users yet..</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );

}