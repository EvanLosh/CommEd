import React, { useInsertionEffect } from "react";
import PostCard from './PostCard'


function PostCardList({ posts, commonProps, removable }) {



    if (!posts) {
        posts = []
    }

    // function fetchUsersPlaylists() {
    //     return null
    // }

    // useInsertionEffect(fetchUsersPlaylists, [])


    const postCards = <div>
        {posts.map((post) => {
            return <PostCard key={post.id} post={post} commonProps={commonProps} removable={removable} usersPlaylists={commonProps.user.playlists}/>
        })}
    </div>


    return <div id="post-card-list">
        {postCards}
    </div>;
}

export default PostCardList;
