import React from 'react';
import { useFormik } from 'formik';

function SignInOrSignUp({ addUser, commonProps, login, logout, handleUserChange, users }) {

    const handleSelectChange = (event) => {
        console.log(`Signing in user ID = ${event.target.value}`)
        handleUserChange(event.target.value);
    }

    const selectUser =
        <select onChange={handleSelectChange}>
            <option key='-1' value=''>Select user</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>
                    {user.username}
                </option>
            ))}
        </select>

    const formikSignIn = useFormik({
        initialValues: {
            username: '',
            email: ''
        },
        onSubmit: values => {
            console.log(`Logging in: ${values}`)
            fetch(`${commonProps.serverURL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    login(data)
                    addUser(data);
                    formikSignIn.resetForm(); // Reset the form after submit
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
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
                    addUser(data);
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
            />                <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="email"
                onChange={formikSignIn.handleChange}
                value={formikSignIn.values.email}
            />
            <input type="submit" value="Sign In" />
        </form>
    </div>

    const logoutForm = <div><p>You are already logged in.</p>
        <form onSubmit={logout}>
            <input type="submit" value="Log out" />
        </form>
    </div >

    const loginForm = commonProps.loginSession.loggedIn ? logoutForm : signInForm

    const signUpForm = <div>
        <p>Sign up</p>
        <form onSubmit={formikSignUp.handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.username}
            />                <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="email"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.email}
            />
            <input type="submit" value="Sign In" />
        </form>
    </div>


    return (
        <div id="sign-in-or-sign-up">
            {selectUser}
            {signUpForm}
        </div>
    );
}

export default SignInOrSignUp;
