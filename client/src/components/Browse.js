import React from "react";
import PostCardList from './PostCardList'


function Browse({ posts, commonProps }) {



    return <div id="browse">
        <PostCardList posts={posts} commonProps={commonProps} />
    </div>;
}

export default Browse;
