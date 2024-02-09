import React from "react";
import PostCardList from './PostCardList'


function Browse({ posts, commonProps }) {

    console.log(posts)

    return <div id="browse">
        <PostCardList posts={posts} commonProps={commonProps} removable={false} />
    </div>;
}

export default Browse;
