import React, { useEffect, useState } from "react";


function CurrentUser({ commonProps, logout }) {
    let loggedIn = commonProps.user.id > 0

    const handleChange = (e) => {
        const selection = e.target.value
        switch (selection) {
            case 'logout':
                logout()
                break;
            case 'profile':
                window.location.href = commonProps.websiteURL + '/profile'
                break;
            case '':
                break;
            default:
                break;
        }
    }

    const userMenu = <select id='current-user-menu' onChange={handleChange}>
        <option value=''>User menu</option>
        <option value='profile'>Profile</option>
        <option value='logout'>Logout</option>
    </select>

    const currentUserElement =
        loggedIn
            ?
            <div><p id='current-user-name'>{commonProps.user.username}</p> {userMenu} </div>
            :
            <a href={commonProps.websiteURL + '/sign-in-or-sign-up'}>Sign in or sign up</a>


    return <div id="current-user">
        {currentUserElement}
    </div>;
}

export default CurrentUser;
