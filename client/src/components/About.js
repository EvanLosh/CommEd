import React from "react";



function About({ commonProps }) {
    return <div id="about">
        <h1>Welcome</h1>
        <p>CommEd is a forum where users share and discuss their solutions to math problems. And not just math, but engineering, physics, and chemistry, too. It's perfect for teachers and students who need to write and share solutions to their homework assignments.</p>
        <p>I am creating CommEd by myself as a project for my portfolio as an aspiring software engineer. You can view the source code on <a href={'https://github.com/EvanLosh/CommEd'}>Github</a>. </p>
        <p>On the front-end, I use React, Formik, react-tex, and markdownjs. On the back-end, I use Flask and SQLalchemy.</p>
    </div>;
}

export default About;
