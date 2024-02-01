import React, { useState, useEffect } from "react";
import PostCardList from "./PostCardList";


function Posts({ commonProps }) {

    const [posts, setPosts] = useState([])

    function fetchPosts() {
        fetch(commonProps.serverURL + '/posts')
            .then(r => r.json())
            .then((r) => {

                if (r.length > 0) {
                    setPosts(r)
                }
            })
    }

    useEffect(fetchPosts, [])

    return <div id="posts">
        <PostCardList commonProps={commonProps} posts={posts} removable={false} />
    </div>;
}

export default Posts;
