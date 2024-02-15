import React, { useEffect, useState, useInsertionEffect } from "react";
import PostCard from './PostCard'


function PostCardList({ posts, commonProps, removable, renderRemoveButton }) {

    const [usersPlaylists, setUsersPlaylists] = useState([])

    function fetchPlaylists() {
        fetch(commonProps.serverURL + '/playlists')
            .then(r => r.json())
            .then((playlists) => {

                if (playlists.length > 0) {
                    playlists = playlists.filter(p => parseInt(p.owner_id) === parseInt(commonProps.user.id))

                    setUsersPlaylists(playlists)
                }
            })
    }

    useEffect(fetchPlaylists, [])


    if (!posts) {
        posts = []
    }


    const postCards = <div>
        {posts.map((post) => {
            return <PostCard key={post.id} post={post} commonProps={commonProps} removable={removable} usersPlaylists={usersPlaylists} renderRemoveButton={renderRemoveButton} />
        })}
    </div>


    return <div id="post-card-list">
        {postCards}
    </div>;
}

export default PostCardList;
