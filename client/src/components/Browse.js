import React from "react";
import PostCardList from './PostCardList'


function Browse({ posts }) {



    return <div id="browse">
        <PostCardList posts={posts} />
    </div>;
}

export default Browse;
