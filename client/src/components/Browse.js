import React from "react";
import PostCardList from './PostCardList'


function Browse({ posts, commonProps }) {



    return <div id="browse">
        <PostCardList posts={posts} commonProps={commonProps} removable={false} />
    </div>;
}

export default Browse;
