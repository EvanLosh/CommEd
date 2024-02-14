import React, { useEffect, useState } from "react";
import "./Home.css";
import PostCardList from "./PostCardList";
import PlaylistCardList from "./PlaylistCardList";

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
        <h2 className='commed-style'>Featured posts</h2>
        {posts.length > 0 ? <PostCardList commonProps={commonProps} renderRemoveButton={renderRemoveButton} posts={[posts[0], posts[1], posts[2]]} removable={false} /> : null}
        <a href='/posts' className='no-text-decoration'><h3 className="commed-style">{'> View more posts'}</h3></a>
    </div>

    function renderRemoveButton(post) {
        return null
    }

    const playlistsElement = <div id='home-playlists'>
        <h2 className='commed-style'>Featured playlists</h2>
        {playlists.length > 0 ? <PlaylistCardList commonProps={commonProps} playlists={[playlists[0], playlists[1], playlists[2]]} removable={false} /> : null}
        <a href='/playlists' className='no-text-decoration'><h3 className="commed-style">{'> View more playlists'}</h3></a>
    </div>



    return (
        <div id="home">
            {postsElement}

            {playlistsElement}
        </div>
    );
}

export default Home;
