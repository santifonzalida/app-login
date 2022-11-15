import React from 'react';
import { Link } from 'react-router-dom';

export function DefaultPage() {

    return (
        <div>
            <p id="zero-state">
                This is a login demo app created using {" "} 
                <a href="https://reactjs.org/">
                    #reactjs 
                </a> {" "} 
                <a href="https://docs.nestjs.com/">
                    #nestjs 
                </a> {" "}
                <a href="https://www.mongodb.com/">
                    #mongodb 
                </a>

                <br />
                Check out the repository at{" "}
                <a href="https://reactrouter.com/">
                    github.com
                </a>
                .
            </p>

            <p id="zero-links">
                Navigate to <Link to={'/auth'} >Auth</Link>
            </p>
        </div>

    )
}