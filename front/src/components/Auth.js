import React, { useState } from "react";
import { login, createUser } from '../services/auth.service';

export function Auth(props) {
    const formData = {email: "", password: ""};
    const [authMode, setAuthMode] = useState("signin");
    const [responseBody, setResponseBody] = useState(formData);

    const inputChangeHandler = (event) => {
        const {name, value} = event.target
        setResponseBody({...responseBody, [name]: value})
    }

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin");
        setResponseBody(formData);
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        console.log(responseBody);
        login(responseBody).then((res) => {
            if(res.statusCode === 200) {
               // TODO: llamada a login
            }       
        }).catch((error) => {
            throw new Error('Ops we have a problem here.');
        });
     };

     const handleSubmitRegister = (e) => {
        e.preventDefault();
        console.log(responseBody);
        createUser(responseBody).then((res) => {
            console.log(res);
        }).catch((error) => {
            throw new Error('Ops something go wrong!', error);
        })
     };

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmitLogin}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
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
                                onChange={(e)=>inputChangeHandler(e)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e)=>inputChangeHandler(e)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmitRegister}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            name="fullName"
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            onChange={(e)=>inputChangeHandler(e)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            onChange={(e)=>inputChangeHandler(e)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            onChange={(e)=>inputChangeHandler(e)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
