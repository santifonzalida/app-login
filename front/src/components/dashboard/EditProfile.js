import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUSerById } from '../../services/users.service';

export function EditProfile(){

    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('accessToken'));
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
        console.log(user)
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
                />
            </label>
            <label>
                <span>Email</span>
                <input
                type="email"
                name="email"
                placeholder="user@email.com"
                defaultValue={user?.email}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                placeholder="https://example.com/avatar.jpg"
                aria-label="Avatar URL"
                type="text"
                name="avatar"
                defaultValue={user?.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                name="notes"
                defaultValue={user?.notes}
                rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </p>
        </form>
    );
}