import { useState } from 'react';

import { login } from '../services/auth.service';

export function Signin(props) {
    const formData = { email: "", password: "" };
    const [hasError, setHasError] = useState({error:false, message:''});
    const [responseBody, setResponseBody] = useState(formData);
    const [isLoading, setIsLoading] = useState(false);

    const inputChangeHandler = (event) => {
        const { name, value } = event.target
        setResponseBody({ ...responseBody, [name]: value })
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(responseBody);
        login(responseBody).then((res) => {
            setIsLoading(false);
            if (res.statusCode === 200) {
                // TODO: ingreso al sistema
            }
        }).catch(() => {
            setHasError(true);
            setIsLoading(false);
            throw new Error('Ops we have a problem here.');
        });
    };

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmitLogin}>
                    {hasError ? '' : ''}
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={props.changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                autoComplete="off"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={(e) => inputChangeHandler(e)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                autoComplete="off"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e) => inputChangeHandler(e)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                                {isLoading 
                                    ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    : 'Submit'
                                }
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}