import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Profile(){
    const location = useLocation();
    const [user, setUser] = useState(null);
   
    useEffect(() => {
        setUser(location.state.user);
        console.log(location.state.user);
    })


    return (
        <>
            <div id="contact">
                <div>
                {user && user.avatar 
                    ? <img key={user.avatar} src={user.avatar || null} />
                    : '' }
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
                        Created: { user?.created }
                    </p>
                    {user && user.twitter && (
                    <p>
                        <a target="_blank" rel="noreferrer" href={`https://twitter.com/${user.twitter}`} >
                        { user.twitter }
                        </a>
                    </p>
                    )}
                    {user && user.notes && <p>{user.notes}</p>}
                    <div>
                        <button type="submit">Edit</button>
                    </div>
                </div>
            </div>
        </>
    )
}