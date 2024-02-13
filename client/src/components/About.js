import React from "react";



function About({ commonProps }) {
    return <div id="about">
        <h1>Welcome</h1>
        <p>CommEd is a forum where users share and discuss their solutions to math problems. And not just math, but engineering, physics, and chemistry, too. It's perfect for teachers and students who need to write and share solutions to their homework assignments.</p>
        <p>I am creating CommEd by myself as a project for my portfolio as an aspiring software engineer. You can view the source code on <a href={'https://github.com/EvanLosh/CommEd'}>Github</a>. </p>
        <p>On the front-end, I use React, Formik, react-tex, and markdownjs. On the back-end, I use Flask and SQLalchemy.</p>
        <p>Development to-do list:</p>
        <ul>
            <li>Add/improve Back-end data validations and error handling</li>
            <li>Add a button to each post while viewing a playlist to remove the post from the playlist</li>
            <li>Add a search and filter feature to lists of posts or playlists</li>
            <li>Add a guide for creating posts and comments</li>
            <li>Add live preview of posts and comments during creation and editing</li>
            <li>On the homepage, add a list of posts that the user recently viewed, so the user can easily view them again</li>
            <li>Add a user profile page with a history of the user's posts, playlists, and comments</li>
            <li>Render markdown in posts and comments</li>
            <li>Render block-style Tex (currently rendering only inline-style TeX)</li>
            <li>Enable users to show diagrams in their posts</li>
            <li>Enable users to show charts in their posts</li>
            <li>Add security and privacy to logging in</li>
            <li>Add a view-random-post button</li>
            <li>Add a 'like' feature to posts and playlists</li>
            <li>Allow the user to view a list of posts that they liked</li>
            <li>Add a print button to posts that opens a new tab with a printer-friendly version of the post</li>
            <li>Add notification to the user when a post or comment belonging to the user receives a reply</li>
        </ul>
        <p>Known issues:</p>
        <ul>
            <li>In creating and editing posts, the 'save draft' and 'publish' radio options do not show the user's selection.</li>
        </ul>

    </div>;
}

export default About;
