import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ViewPlaylist from "./ViewPlaylist";



function PlaylistFetcher({ commonProps }) {
    const { playlist_id } = useParams()
    const [playlist, setPlaylist] = useState(commonProps.blankPlaylist)
    const [newPost_id, setNewPost_id] = useState('')
    console.log(playlist)

    useEffect(() => {
        console.log('fetching playlist')
        fetch(commonProps.serverURL + '/playlists/' + playlist_id)
            .then(r => r.json())
            .then((r) => {
                console.log(r)
                setPlaylist(r)
            })
    }, [])


    function addPlaylist(id) {
        fetch(commonProps.serverURL + '/playlists/' + playlist_id,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'add', post_id: id })
            }
        )
            .then(r => r.json())
            .then((r) => {
                setPlaylist(r)
            })
    }

    function handleAddSubmit(e) {
        e.preventDefault()
        addPlaylist(newPost_id)
    }

    let addPlaylistForm = commonProps.user.id === playlist.owner_id ?
        <form>
            <label>To add a post, enter it's id: </label>
            <input type='text' name='post-id' value={newPost_id} onChange={(e) => setNewPost_id(e.target.value)}></input>
            <button onClick={handleAddSubmit}>Add post</button>
        </form>
        :
        null


    function renderRemoveButton(playlist_id, post_id, removable) {
        if (!removable) {
            return null
        }
        function handleRemoveClick(e) {
            fetch(commonProps.serverURL + '/playlists/' + playlist_id,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ action: 'add', post_id: post_id })
                }
            )
                .then(r => r.json())
                .then((r) => {
                    setPlaylist(r)
                })
        }
        return <button className='remove-from-list' onClick={handleRemoveClick}>Remove post from playlist</button>
    }

    return <div id="view-playlist">
        <ViewPlaylist playlist={playlist} commonProps={commonProps} addPlaylistForm={addPlaylistForm} renderRemoveButton={renderRemoveButton} />
    </div>;
}

export default PlaylistFetcher;
