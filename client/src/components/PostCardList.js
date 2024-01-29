import React from "react";
import PostCard from './PostCard'


function PostCardList({ posts }) {

    // console.log('PostCardList is rendering: ')
    // console.log(posts)

    const postCards = <div>
        {posts.map((post) => {
            return <PostCard key={post.id} post={post} />
        })}
    </div>


    return <div id="post-card-list">
        {postCards}
    </div>;
}

export default PostCardList;
