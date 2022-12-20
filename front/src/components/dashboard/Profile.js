import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Profile(){
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    
    useEffect(() => {
        setUser(location.state);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setIsOwner(userInfo.userId === location.state._id);
    })

    const logout = (event) => {
        if (confirm("Please confirm you want to logout.")) {
            event.preventDefault();
            localStorage.removeItem('userInfo');
            localStorage.removeItem('accessToken');
            navigate("/");
        }
    }

    return (
        <>
            <div id="contact">
                <div>
                <img key={user?.avatarUrl} src={user?.avatarUrl || null} />
                </div>
                <div>
                    <h1>
                        {user && user.fullName ? (
                            <>
                            {user.fullName}
                            </>
                        ) : (
                            <i>No Name</i>
                        )}
                    </h1>
                    <p>
                        Created: { new Date(user?.created).toLocaleString() }
                    </p>
                    {user && user.twitter && (
                        <p>
                            <a target="_blank" rel="noreferrer" href={`https://twitter.com/${user.twitter}`} >
                            { user.twitter }
                            </a>
                        </p>
                    )}
                    <p>{user?.email}</p>
                    {user?.notes && <p>{user?.notes}</p>}
                    <div>
                        <button type="submit" hidden={!isOwner} onClick={() => navigate(`/dashboard/profile/${user?._id}/edit`)}>Edit</button>
                        <button type="submit" hidden={!isOwner} onClick={logout}>Log out</button>
                    </div>
                </div>
            </div>
        </>
    )
}