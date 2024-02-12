import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import PostCardList from './PostCardList'



function ViewPlaylist({ playlist, commonProps, addPlaylistForm, renderRemoveButton }) {
    if (!playlist) {
        playlist = commonProps.blankPlaylist
    }

    function handleDeleteClick(e) {
        console.log(e)
        fetch(commonProps.serverURL + '/playlists/' + playlist.id, {
            method: 'DELETE'
        })
    }

    const deleteButton =
        commonProps.user.id === playlist.owner_id
            ?
            <button onClick={handleDeleteClick}>Delete playlist</button>
            :
            null

    console.log(playlist)
    return <div id="view-playlist">
        <h3>{playlist.title}</h3>
        {commonProps.renderDatetimeAndAuthor(playlist)}
        {deleteButton}
        {/* {addPlaylistForm} */}
        <PostCardList posts={playlist.posts} commonProps={commonProps} removable={commonProps.user.id === playlist.owner_id} renderRemoveButton={renderRemoveButton} />
        {/* {playlist.posts.length > 0 ? <PostCardList posts={playlist.posts} commonProps={commonProps} /> : null} */}
    </div>;
}

export default ViewPlaylist;
