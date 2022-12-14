import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { validateUrl, saveNewPassword } from '../services/auth.service';


export function ResetPasswordForm() {

    const { userId, token } = useParams();
    const [hasError, setHasError] = useState({ error: false, message: '', variant: 'danger' });
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [enableForm, setEnableForm] = useState(false);

    useEffect(() => {
        validateUrl(userId, token)
        .then((res) => {
            if (res.isValid) {
                console.log(res);
            }
        })
        .catch((error) => {
            setHasError({
                error: true,
                message: error.response.data.message,
                variant: 'danger',
            });
            setEnableForm(true);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, []);


const inputChangeHandler = (event) => {
    const { value } = event.target;
    setPassword({ password: value });
    console.log(password);
}

const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    saveNewPassword(userId, password)
    .then((res) => {
        console.log(res); 
    })
    .catch((err) => {
        setHasError({
            error: true,
            message: err.response.data.message,
            variant: 'danger',
        });
    })
    .finally(() => setIsLoading({ isLoading: false }))

};

const onCloseAlert = () => {
    setHasError({
        error:false,
        message: '',        
    });
}

return (
    <>
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                {hasError.error
                    ? <Alert variant={hasError.variant} dismissible onClose={onCloseAlert} style={{ textAlign: 'center' }}>{hasError.message}</Alert>
                    : ''
                }
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Reset password</h3>
                    <div className="text-center">
                        Set your new password
                    </div>

                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="form-control mt-1"
                            placeholder="Password"
                            onChange={(e) => inputChangeHandler(e)}
                            disabled={enableForm}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" disabled={enableForm || isLoading}>
                            {isLoading
                                ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                : 'Save new password'
                            }
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </>
)}

