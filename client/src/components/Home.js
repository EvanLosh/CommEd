import React, { useEffect, useState } from "react";
import "./Home.css";
import PostCardList from "./PostCardList";
import PlaylistCardList from "./PlaylistCardList";
import { InlineTex } from 'react-tex'

function Home({ commonProps }) {

    const [posts, setPosts] = useState([])
    const [playlists, setPlaylists] = useState([])

    function fetchPosts() {
        fetch(commonProps.serverURL + '/posts')
            .then(r => r.json())
            .then((r) => {

                if (r.length > 0) {
                    setPosts(r)
                }
            })
    }

    function fetchPlaylists() {
        fetch(commonProps.serverURL + '/playlists')
            .then(r => r.json())
            .then((r) => {

                if (r.length > 0) {
                    setPlaylists(r)
                }
            })
    }

    function fetchPostsAndPlaylists() {
        fetchPosts()
        fetchPlaylists()
    }

    useEffect(fetchPostsAndPlaylists, [])

    const postsElement = <div id='home-posts'>
        <h3 className='commed-style'>Featured posts</h3>
        {posts.length > 0 ? <PostCardList commonProps={commonProps} renderRemoveButton={renderRemoveButton} posts={[posts[0], posts[1], posts[2]]} removable={false} /> : null}
        <a href='/posts' className='no-text-decoration'><p className="commed-style button">{'> View more posts'}</p></a>
    </div>

    function renderRemoveButton(post) {
        return null
    }

    const playlistsElement = <div id='home-playlists'>
        <h3 className='commed-style'>Featured playlists</h3>
        {playlists.length > 0 ? <PlaylistCardList commonProps={commonProps} playlists={[playlists[0], playlists[1], playlists[2]]} removable={false} /> : null}
        <a href='/playlists' className='no-text-decoration'><p className="commed-style button">{'> View more playlists'}</p></a>
    </div>

    const texDemonstration = <div id='tex-demonstration'>
        <p id='tex-demonstration-raw-tex' className='code'>{"$$ \\int_a^b f(x) \\mathrm{d} x  $$"}</p>
        <div className='white-space'></div>
        <div className='arrow tex'><InlineTex texContent={" $$ \\longrightarrow $$"} /></div>
        <div className='white-space'></div>
        <div id='tex-demonstration-rendered-tex' className='tex'><InlineTex texContent={"$$ \\int_a^b f(x) \\mathrm{d} x  $$"} /></div>
    </div>

    const introElement = <div id='home-intro'>
        <div >

            <h1 className='home-intro-welcome-message'>Welcome to CommEd,</h1> 
            <br></br>
            <p className='home-intro-welcome-message'>a forum for community-powered education. CommEd makes it easy to type up your math homework using TeX code for typesetting. </p>
            <p>Example:</p>
        </div>
        {texDemonstration}
        <p> You can write beautiful, professional quality solutions to math problems, and share them with the world!</p>
    </div>

    return (
        <div id="home">
            {introElement}
            {postsElement}

            {playlistsElement}
        </div>
    );
}

export default Home;
