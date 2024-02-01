import React, { useEffect, useState } from "react";


function CurrentUser({ commonProps, logout }) {
    let loggedIn = commonProps.user.id > 0

    const handleChange = (e) => {
        const selection = e.target.value
        switch (selection) {
            case 'logout':
                logout()
                break;
            default:
                return null
        }
    }

    const userMenu = <select onChange={handleChange}>
        <option value=''>User menu</option>
        <option value='logout'>Logout</option>
    </select>

    const currentUserElement =
        loggedIn
            ?
            <div><p>{commonProps.user.username}</p> {userMenu} </div>
            :
            <a href={commonProps.websiteURL + '/sign-in-or-sign-up'}>Sign in or sign up</a>


    return <div id="CurrentUser">
        {currentUserElement}
    </div>;
}

export default CurrentUser;
