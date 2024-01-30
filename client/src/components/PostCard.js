import React from "react";



function PostCard({ post, commonProps }) {

    const handleClick = (e) => {
        window.location.href = commonProps.websiteURL + '/view-post/' + post.id
    }


    const postCard = <div >
        <p onClick={handleClick}>{post.title}</p>
        {commonProps.renderTags(post.tags)}
        {commonProps.renderDatetimeAndAuthor(post)}
    </div>

    return <div className="post-card">
        {postCard}
    </div>;
}

export default PostCard;
