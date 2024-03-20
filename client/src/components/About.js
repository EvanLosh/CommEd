import React from "react";



function About({ commonProps }) {
    return <div id="about">
        <h1>About</h1>
        <p>CommEd is a forum where users share and discuss their solutions to math problems. And not just math, but engineering, physics, and chemistry, too. It's perfect for teachers and students who need to write and share solutions to their homework assignments.</p>
        <p>I am creating CommEd by myself as a project for my portfolio as an aspiring software engineer. You can view the source code on <a href={'https://github.com/EvanLosh/CommEd'}>Github</a>. </p>
        <p>On the front-end, I use React, Formik, and <a href='https://www.npmjs.com/package/react-tex'>react-tex</a>. On the back-end, I use Flask and SQLalchemy.</p>
        <p>In development:</p>
        <ul>
            <li>Add privacy and security to user sessions (JWT, password hashing, encryption)</li>
            <li>Improve data validations and error handling</li>
            <li>Add a search and filter feature to lists of playlists</li>
            <li>Add a guide for using TeX</li>
            <li>Add live preview of posts and comments during creation and editing</li>
            <li>On the homepage, add a list of posts that the user recently viewed, so the user can easily view them again</li>
            <li>Add a user profile page with a history of the user's posts, playlists, and comments</li>
            <li>Allow users to hide their posts and playlists</li>
            <li>Overhaul the body structure of posts: Allow the user to add sections of certain types (heading, paragraph, equation, figure) </li>
            <li>Render markdown in posts and comments</li>
            <li>Render block-style Tex (currently rendering only inline-style TeX)</li>
            <li>Add a print button to posts that opens a new tab with a printer-friendly version of the post</li>
            <li>Implement notifications to the user when a post or comment belonging to the user receives a reply</li>
            <li>Enable users to show diagrams in their posts</li>
            <li>Enable users to show charts in their posts</li>
            <li>Add a view-random-post button on the homepage</li>
            <li>Add a 'like' feature to posts and playlists</li>
            <li>Allow the user to view a list of posts that they liked</li>
            <li>Add a Groups feature. Users can create groups and invite other users. Users can make their posts viewable only by members of certain groups. </li>
            <li>Overhaul styling with Tailwind</li>
        </ul>
        <p>Known issues:</p>
        <ul>
            <li>Sorting post list by author does not work</li>
            <li>Deleting a comment with children also deletes those comments from the post object</li>
            <li>Sign Up and Sign In error messages are not displaying</li>
            <li>InlineTex's formatting of fractions is ugly</li>
            <li>User cannot make line breaks in their posts and comments</li>
        </ul>

    </div>;
}

export default About;
