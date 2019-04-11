import React from 'react';

const LoginForm = props => (
    <React.Fragment>
        <h1>Sign In</h1>
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button type='submit'>Let's go!</button>
    </React.Fragment>
);

export default LoginForm;