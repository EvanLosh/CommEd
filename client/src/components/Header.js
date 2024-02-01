import React, { useEffect, useState } from "react";
import CurrentUser from "./CurrentUser";
import "./Header.css"


function Header({ commonProps, getSessionUser, logout }) {
    return <div id="header">
        <a id='site-title' href={commonProps.websiteURL} >CommEd</a>
        {/* <a href={commonProps.websiteURL + '/sign-in-or-sign-up'}>Sign in or sign up</a> */}
        <button onClick={() => getSessionUser()}>who is user</button>
        <a href={commonProps.websiteURL + '/posts'}>Posts</a>
        <a href={commonProps.websiteURL + '/playlists'}>Playlists</a>
        <a href={commonProps.websiteURL + '/create'}>Create</a>
        <a href={commonProps.websiteURL + '/about'}>About</a>
        <CurrentUser commonProps={commonProps} logout={logout} />
    </div>;
}

export default Header;