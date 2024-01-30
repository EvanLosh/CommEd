import React from "react";
import PostCard from './PostCard'


function PostCardList({ posts, commonProps }) {



    const postCards = <div>
        {posts.map((post) => {
            return <PostCard key={post.id} post={post} commonProps={commonProps} />
        })}
    </div>


    return <div id="post-card-list">
        {postCards}
    </div>;
}

export default PostCardList;
