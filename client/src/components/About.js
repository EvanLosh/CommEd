import React from "react";



function About({ commonProps }) {
    return <div id="about">
        <h1>Welcome</h1>
        <p>CommEd is a forum where users share and discuss their solutions to math problems. And not just math, but engineering, physics, and chemistry, too. It's perfect for teachers and students who need to write and share solutions to their homework assignments.</p>
        <p>I am creating CommEd by myself as a project for my portfolio as an aspiring software engineer. You can view the source code on <a href={'https://github.com/EvanLosh/CommEd'}>Github</a>. </p>
        <p>On the front-end, I use React, Formik, react-tex, and markdownjs. On the back-end, I use Flask and SQLalchemy.</p>
        <p>Development to-do list:</p>
        <ul>
            <li>Add a select menu to posts to add the post to a playlist</li>
            <li>Add a button to posts in playlists to remove the post from the playlist</li>
            <li>Add a search and filter feature to lists of posts or playlists</li>
            <li>Add a guide for creating posts and comments</li>
            <li>Add live preview of posts and comments during creation and editing</li>
            <li>Add a user profile page</li>
            <li>Back end data validations</li>
            <li>Render markdown of user-submitted strings</li>
            <li>Render block-style Tex (currently rendering only inline-style TeX)</li>
            <li>Enable users to show diagrams in their posts</li>
            <li>Enable users to show charts in their posts</li>
            <li>Add security and privacy to logging in</li>
            <li>Add a view-random-post button</li>
            <li>Add a 'like' feature to posts and playlists</li>
            <li>Add a print button to posts that opens a new tab with a printer-friendly version of the post</li>
        </ul>
        <p>Known issues:</p>
        <ul>
            <li>Adding a post to a playlist does not update the add-to-playlist select menu, even upon refreshing the page. This is because the user's playlists are loaded from sessionStorage which is updated only when the user logs in.</li>
            <li>In creating and editing posts, the 'save draft' and 'publish' radio options do not show the user's selection.</li>
            <li>Adding tags to posts works while editing posts but not while creating posts.</li>
        </ul>

    </div>;
}

export default About;
