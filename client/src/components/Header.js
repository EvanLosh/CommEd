import React, { useEffect, useState } from "react";
import CurrentUser from "./CurrentUser";
import "./Header.css"


function Header({ commonProps, getSessionUser, logout }) {
    return <div id="header">
        <div id='site-title'>

            <a id='site-title-text' href={commonProps.websiteURL} >CommEd</a>
        </div>
        <div id='dashboard'>
            <div id='dashboard-inner'>
                {/* <a href={commonProps.websiteURL + '/sign-in-or-sign-up'}>Sign in or sign up</a> */}
                {/* <button onClick={() => getSessionUser()}>who is user</button> */}
                <div id='dashboard-links'>
                    <a href={commonProps.websiteURL + '/posts'}>Posts</a>
                    <a href={commonProps.websiteURL + '/playlists'}>Playlists</a>
                    <a href={commonProps.websiteURL + '/create'}>Create</a>
                    <a href={commonProps.websiteURL + '/about'}>About</a>
                </div>
                <CurrentUser commonProps={commonProps} logout={logout} />
            </div>
        </div>
    </div>;
}

export default Header;