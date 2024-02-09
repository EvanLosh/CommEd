import React from "react";
import { Tex, InlineTex } from 'react-tex'
import './PostCard.css'



function PostCard({ post, commonProps, removable, renderRemoveButton }) {

    const handleClick = (e) => {
        window.location.href = commonProps.websiteURL + '/view-post/' + post.id
    }




    const postCard = <div className='post-card-content'>
        <div onClick={handleClick}><InlineTex texContent={post.title} /></div>
        {commonProps.renderTags(post.tags)}
        {commonProps.renderDatetimeAndAuthor(post)}
        {/* {renderRemoveButton()} */}
    </div>

    return <div className="post-card">
        {postCard}
    </div>;
}

export default PostCard;
