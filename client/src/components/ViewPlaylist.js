import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import PostCardList from './PostCardList'
import './ViewPlaylist.css'



function ViewPlaylist({ playlist, commonProps, }) {
    if (!playlist) {
        playlist = commonProps.blankPlaylist
    }

    function handleDeleteClick(e) {

        fetch(commonProps.serverURL + '/playlists/' + playlist.id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${commonProps.authJWT}`,
            }
        })
            // .then(r => r.json())
            .then(r => window.location.reload())
    }

    const deleteButton =
        commonProps.user.id === playlist.owner_id
            ?
            <button className='button' onClick={handleDeleteClick}>Delete playlist</button>
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

                        window.location.reload()
                    })
            }

            return <button className='button' onClick={handleRemoveClick}>Remove from playlist</button>
        }
    }




    return <div id="view-playlist">
        {playlist.title ? <div><p id='view-playlist-title'>Playlist: {playlist.title}</p><div id='view-playlist-datetime-and-author'> {commonProps.renderDatetimeAndAuthor(playlist)}</div></div> : <div><h3>Playlist not found</h3> <button className='button' onClick={() => window.location.href = '/'}>Return home</button> </div>
        }
        {deleteButton}
        <PostCardList posts={playlist.posts} commonProps={commonProps} removable={commonProps.user.id === playlist.owner_id} renderRemoveButton={renderRemoveButton} />
    </div >;
}

export default ViewPlaylist;
