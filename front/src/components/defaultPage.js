import React from 'react';
import { Link } from 'react-router-dom';

export function DefaultPage() {

    return (
        <div>
            <p id="zero-state">
                This is a Login demo using #reactjs #nestjs #mongodb
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