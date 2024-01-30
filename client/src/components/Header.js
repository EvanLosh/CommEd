import React, { useEffect, useState } from "react";
import "./Header.css"


function Header({ commonProps }) {
    return <div id="header">
        <h1 id='site-title'>CommEd</h1>
        <p>logged in = {commonProps.loginSession.loggedIn ? 'True' : 'False'}. Username = {commonProps.loginSession.user.username}.</p>
    </div>;
}

export default Header;