import React, { useState } from "react";
import './AddToPlaylist.css'



function AddToPlaylist({ commonProps, usersPlaylists, post }) {

    const [creatingNewPlaylist, setCreatingNewPlaylist] = useState(false)
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('')

    if (!usersPlaylists) {
        usersPlaylists = []
    }

    function playlistPostIDs(playlist) {
        return playlist.posts.map(p => p.id)
    }

    function postIsInPlaylist(post, playlist) {
        return playlistPostIDs(playlist).includes(post.id)
    }

    usersPlaylists.forEach(playlist => playlist.postIsInPlaylist = postIsInPlaylist(post, playlist))


    function handleChange(e) {

        const eTargetValue = e.target.value

        if (eTargetValue === 'Create a new playlist') {
            setCreatingNewPlaylist(true)
            return null
        }
        else if (eTargetValue === '') {
            return null
        }
        else if (eTargetValue.postIsInPlaylist) {
            console.log('That playlist already contains this post')
            return null
        }
        else {
            const values = { post_id: post.id, action: 'add' }
            fetch(commonProps.serverURL + '/playlists/' + eTargetValue, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(r => r.json())
                .then((r) => {

                    window.location.reload()
                })
        }
        // else {
        //     return null
        // }
    }

    const addToPlaylist = <select className='add-to-playlist-select' onChange={handleChange}>
        <option value=''>Add to playlist</option>
        {usersPlaylists.map((playlist) => {
            return <option key={playlist.id} name='playlist' value={playlist.id}>{playlist.postIsInPlaylist ? '✓  ' : null} {playlist.title}</option>
        })}
        <option name='Create a new playlist' value='Create a new playlist'>+ Create a new playlist</option>
    </select>

    function handleNewTitleChange(e) {
        setNewPlaylistTitle(e.target.value)
    }

    function handleNewPlaylistSubmit(e) {
        e.preventDefault()
        fetch(commonProps.serverURL + '/playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ owner_id: commonProps.user.id, title: newPlaylistTitle, post_id: post.id })
        })
            .then(r => r.json())
            .then((r) => {

                window.location.reload()
            })
    }

    const createNewPlaylistForm =
        creatingNewPlaylist
            ?
            <form className='create-new-playlist-form' onSubmit={handleNewPlaylistSubmit}>
                <label>New playlist title:</label>
                <input className='create-new-playlist-input' name='New playlist title' value={newPlaylistTitle} onChange={handleNewTitleChange}></input>
                <input className='create-new-playlist-submit button' type='submit' value='Submit'></input>
                <button className='create-new-playlist-cancel button' onClick={() => setCreatingNewPlaylist(false)}>Cancel</button>
            </form>
            :
            null


    return <div>
        {addToPlaylist}
        {createNewPlaylistForm}
    </div>
}

export default AddToPlaylist;
