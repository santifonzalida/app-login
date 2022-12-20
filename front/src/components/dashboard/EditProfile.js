import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUSerById, editProfile as editProfileService } from '../../services/users.service';

export function EditProfile(){

    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('accessToken')));
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
        getUSerById(userInfo.userId ,token)
            .then((data) => {
                setUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    },[])

    const onSubmitEdit = (e) => {
        e.preventDefault();
        editProfileService(user, token)
            .then((data) => {
                navigate(`/dashboard/profile/${data._id}`, {state:data});
            }).catch((err) => { 
                console.log(err);
            });
    }

    const inputChangeHandler = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    return (
        <form id="contact-form" onSubmit={onSubmitEdit}>
            <label>
                <span>Full name</span>
                <input
                    placeholder="Full name"
                    aria-label="Full name"
                    type="text"
                    name="fullName"
                    defaultValue={user?.fullName}
                    onChange={(e) => inputChangeHandler(e)}
                />
            </label>
            <label>
                <span>Email</span>
                <input
                    type="email"
                    name="email"
                    placeholder="user@email.com"
                    defaultValue={user?.email}
                    onChange={(e) => inputChangeHandler(e)}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatarUrl"
                    defaultValue={user?.avatarUrl}
                    onChange={(e) => inputChangeHandler(e)}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={user?.notes}
                    rows={6}
                    onChange={(e) => inputChangeHandler(e)}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </p>
        </form>
    );
}