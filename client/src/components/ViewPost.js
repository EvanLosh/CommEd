import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmitComment from "./SubmitComment";
import Comment from './Comment'
import { Tex, InlineTex } from 'react-tex'
import AddToPlaylist from "./AddToPlaylist";
import './ViewPost.css'



function ViewPost({ commonProps }) {
    const { post_id } = useParams()
    const [post, setPost] = useState(commonProps.blankPost)
    console.log(post)

    const [usersPlaylists, setUsersPlaylists] = useState([])

    function fetchPlaylists() {
        fetch(commonProps.serverURL + '/playlists')
            .then(r => r.json())
            .then((playlists) => {
                console.log('Current user id is ' + commonProps.user.id)
                console.log('loaded playlists from API:')
                console.log(playlists)
                if (playlists.length > 0) {
                    playlists = playlists.filter(p => parseInt(p.owner_id) === parseInt(commonProps.user.id))
                    console.log("setting user's playlists:")
                    console.log(playlists)
                    setUsersPlaylists(playlists)
                }
            })
    }





    useEffect(() => {
        const url = commonProps.serverURL + '/posts/' + post_id
        fetchPlaylists()
        fetch(url)
            .then(r => r.json())
            .then(r => setPost(r))
    }, [])



    function renderComments(x, type) {

        let post_id = null
        if (type === 'comment') {
            post_id = x.post_id
        }
        if (type === 'post') {
            post_id = x.id
        }
        if ((x) && (x.comments) && x.comments.length > 0) {
            return <div>
                {x.comments.map((c) => {
                    return <Comment key={c.id} comment={c} commonProps={commonProps} post_id={post_id} renderComments={renderComments} />
                })}
            </div>
        }
        else {
            return null
        }
    }

    // function addPostToPlaylist(post_id, playlist_id) {
    //     fetch(commonProps.serverURL + '/playlists/' + playlist_id,
    //         {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(post_id)
    //         })
    //         .then(r => r.json())
    //         .then(r => console.log('Added post #' + post_id + ' to playlist #' + playlist_id))
    // }




    function renderPost(p) {
        return <div id="view-post">
            <div id='view-post-title'><InlineTex texContent={p.title} /></div>
            {commonProps.renderDatetimeAndAuthor(p)}
            {commonProps.renderTags(p.tags)}
            <AddToPlaylist commonProps={commonProps} post={p} usersPlaylists={usersPlaylists} />
            {parseInt(commonProps.user.id) === parseInt(p.owner.id) ? <p onClick={() => window.location.href = commonProps.websiteURL + '/edit-post/' + p.id} className='commed-style'>Edit your post</p> : null}
            <h3 className='section-title'>Problem:</h3>
            <div><InlineTex texContent={p.problem_body} /></div>
            <h3 className='section-title'>Answer:</h3>
            <div><InlineTex texContent={p.answer_body} /></div>
            <h3 className='section-title'>Solution:</h3>
            <div><InlineTex texContent={p.solution_body} /></div>
            <h3 className='section-title'>Refernces:</h3>
            <p>{p.references}</p>
            {p.owner.id === commonProps.user.id ? commonProps.renderDelete(p) : null}
            <h3 className='section-title'>Comments:</h3>
            <SubmitComment commonProps={commonProps} parent_id={null} post_id={p.id} />
            {renderComments(p, 'post')}
        </div>
    }

    return renderPost(post)
}

export default ViewPost;
