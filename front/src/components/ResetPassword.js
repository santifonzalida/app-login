import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

import { validateUrl } from '../services/auth.service';


export function ResetPasswordForm() {

    const [searchParams] = useSearchParams();
    const [hasError, setHasError] = useState({ error: false, message: '', variant: 'danger' });
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (event) => {
        const { value } = event.target;
        setPassword({ password: value });
        console.log(password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchParams.getAll(0))
        setIsLoading({ isLoading: true });

        validateUrl('ads')
            .then((res) => {
                setHasError({
                    error: false,
                    message: res.data.message,
                    variant: 'success',
                });
            })
            .catch((error) => {
                setHasError({
                    error: false,
                    message: error.response.data.message,
                    variant: 'danger',
                });
            })
            .finally(() => {
                setIsLoading({ isLoading: false });
            }
        );
    };

    const onCloseAlert = () => {
        this.setState({
            hasError: {
                error: false,
                message: ''
            }
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
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                {isLoading
                                    ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    : 'Reset my password'
                                }
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}

