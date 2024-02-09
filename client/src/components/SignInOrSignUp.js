import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

function SignInOrSignUp({ commonProps, login, logout, }) {

    // const [justLoggedIn, setJustLoggedIn] = useState(false)
    // useEffect(() => window.location.href = commonProps.websiteURL, [justLoggedIn])

    const formikSignIn = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            // console.log(`Logging in: `)
            // console.log(values)
            login(values)
        },
    });

    const formikSignUp = useFormik({
        initialValues: {
            username: '',
            email: ''
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
                    formikSignUp.resetForm(); // Reset the form after submit
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    });

    const signInForm = <div>
        <p>Sign in</p>
        <form onSubmit={formikSignIn.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                onChange={formikSignIn.handleChange}
                value={formikSignIn.values.username}
            />
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                name="email"
                onChange={formikSignIn.handleChange}
                value={formikSignIn.values.email}
            />
            <input type="submit" value="Sign in" />
        </form>
    </div>

    const logoutForm = <div><p>You are logged in as {commonProps.user.username}.</p>
        <form onSubmit={logout}>
            <input type="submit" value="Log out" />
        </form>
    </div >

    const loginForm = commonProps.user.id > 0 ? logoutForm : signInForm

    const signUpForm = <div>
        <p>Sign up</p>
        <form onSubmit={formikSignUp.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.username}
            />
            <label htmlFor="email">email:</label>
            <input
                type="text"
                name="email"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.email}
            />
            <input type="submit" value="Sign up" />
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
