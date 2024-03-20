import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './SignInOrSignUp.css'

function SignInOrSignUp({ commonProps, login, logout, }) {

    const [createdNewUser, setCreatedNewUser] = useState(false)

    const formikSignIn = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        onSubmit: values => {
            login(values)
        },
    });

    const formikSignUp = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        onSubmit: values => {
            console.log(`Creating new user: ${values}`)
            fetch(`${commonProps.serverURL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    setCreatedNewUser(true)
                    formikSignUp.resetForm(); // Reset the form after submit
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    });

    const signInForm = <div>
        <h3>Sign in</h3>
        <form onSubmit={formikSignIn.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                onChange={formikSignIn.handleChange}
                value={formikSignIn.values.username}
            />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input
                type="text"
                name="password"
                onChange={formikSignIn.handleChange}
                value={formikSignIn.values.password}
            />
            <br></br>
            {/* <label htmlFor="email">Email (not required):</label>
            <input
                type="text"
                name="email"
                onChange={formikSignIn.handleChange}
                value={formikSignIn.values.email}
            />
            <br></br> */}
            <input className='submit button' type="submit" value="Sign in" />
        </form>
    </div>

    const logoutForm = <div><p>You are logged in as {commonProps.user.username}.</p>
        <form onSubmit={logout}>
            <input className='submit button' type="submit" value="Log out" />
        </form>
        <button className='submit button' onClick={() => window.location.href = commonProps.websiteURL}>Return home</button>
    </div >

    const loginForm = commonProps.user.id > 0 ? logoutForm : signInForm

    const signUpSuccessMessage =
        createdNewUser
            ?
            <p id='signup-success-message'>Successfully created new user. You may sign in.</p>
            :
            null

    const signUpForm = <div>
        <h3>Sign up</h3>

        <form onSubmit={formikSignUp.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.username}
            />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input
                type="text"
                name="password"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.password}
            />
            <br></br>
            <label htmlFor="email">Email (required):</label>
            <input
                type="text"
                name="email"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.email}
            />
            <br></br>
            {signUpSuccessMessage}
            <input className='submit button' type="submit" value="Sign up" />
        </form>
    </div>


    return (
        <div id="sign-in-or-sign-up">
            {loginForm}
            <br></br>
            {signUpForm}
        </div>
    );
}

export default SignInOrSignUp;
