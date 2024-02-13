import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import PostCardList from './PostCardList'



function ViewPlaylist({ playlist, commonProps, }) {
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

    function renderRemoveButton(post) {
        if (commonProps.user.id !== playlist.owner_id) {
            return null
        }
        else {
            function handleRemoveClick(e) {
                fetch(commonProps.serverURL + '/playlists/' + playlist.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ post_id: post.id, action: 'remove' })
                })
                    .then(r => r.json())
                    .then((r) => {
                        console.log('Removed post id = ' + post.id + ' from playlist id = ' + playlist.id)
                        window.location.reload()
                    })
            }

            return <button onClick={handleRemoveClick}>Remove from playlist</button>
        }
    }



    console.log(playlist)
    return <div id="view-playlist">
        {playlist.title ? <div><h3>{playlist.title}</h3>{commonProps.renderDatetimeAndAuthor(playlist)}</div> : <h3>Playlist not found</h3>}
        {deleteButton}
        <PostCardList posts={playlist.posts} commonProps={commonProps} removable={commonProps.user.id === playlist.owner_id} renderRemoveButton={renderRemoveButton} />
    </div>;
}

export default ViewPlaylist;
