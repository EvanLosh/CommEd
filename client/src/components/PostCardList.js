import React from "react";
import PostCard from './PostCard'


function PostCardList({ posts, commonProps, removable, renderRemoveButton }) {

    if (!posts) {
        posts = []
    }



    const postCards = <div>
        {posts.map((post) => {
            return <PostCard key={post.id} post={post} commonProps={commonProps} removable={removable} renderRemoveButton={renderRemoveButton} />
        })}
    </div>


    return <div id="post-card-list">
        {postCards}
    </div>;
}

export default PostCardList;
