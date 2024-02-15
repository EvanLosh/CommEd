import React from "react";
import { Tex, InlineTex } from 'react-tex'
import './PostCard.css'
import AddToPlaylist from "./AddToPlaylist";



function PostCard({ post, commonProps, removable, renderRemoveButton, usersPlaylists }) {

    // const handleClick = (e) => {
    //     window.location.href = commonProps.websiteURL + '/view-post/' + post.id
    // }

    if (!usersPlaylists) {
        usersPlaylists = []
    }

    const postCard = <div className='post-card-content'>
        <a href={'/view-post/' + post.id} className='post-title'><InlineTex texContent={post.title} /></a>
        {/* <div onClick={handleClick} className='post-title'><InlineTex texContent={post.title} /></div> */}
        {commonProps.renderDatetimeAndAuthor(post)}
        {commonProps.renderTags(post.tags, false)}
        <AddToPlaylist commonProps={commonProps} post={post} usersPlaylists={usersPlaylists} />
        {renderRemoveButton(post)}
    </div>

    return <div className="post-card">
        {postCard}
    </div>;
}

export default PostCard;
