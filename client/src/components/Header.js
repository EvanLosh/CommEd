import React, { useEffect, useState } from "react";
import "./Header.css"


function Header({ loginSession }) {
    return <div id="header">
        <h1 id='site-title'>CommEd</h1>
        <p>logged in = {loginSession.loggedIn ? 'True' : 'False'}. Username = {loginSession.user.username}.</p>
    </div>;
}

export default Header;