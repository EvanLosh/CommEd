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


    const [usersPlaylists, setUsersPlaylists] = useState([])

    function fetchPlaylists() {
        fetch(commonProps.serverURL + '/playlists')
            .then(r => r.json())
            .then((playlists) => {

                if (playlists.length > 0) {
                    playlists = playlists.filter(p => parseInt(p.owner_id) === parseInt(commonProps.user.id))

                    setUsersPlaylists(playlists)
                }
            })
    }





    useEffect(() => {
        const url = commonProps.serverURL + '/posts/' + post_id
        fetchPlaylists()
        fetch(url)
            .then(r => r.json())
            .then((r) => {
                if (r) {
                    setPost(r)
                }
                else {
                    setPost(commonProps.blankPost)
                }
            })
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





    function renderPost(p) {
        return post.id > 0
            ?
            <div id="view-post">
                <div id='view-post-title'><InlineTex texContent={p.title} /></div>
                {commonProps.renderDatetimeAndAuthor(p)}
                {commonProps.renderTags(p.tags, false)}
                <AddToPlaylist commonProps={commonProps} post={p} usersPlaylists={usersPlaylists} />
                {parseInt(commonProps.user.id) === parseInt(p.owner.id) ? <p onClick={() => window.location.href = commonProps.websiteURL + '/edit-post/' + p.id} className='commed-style button'>Edit your post</p> : null}
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
            :
            <p>Post not found. <a href='/'>Return home.</a></p>
    }

    return renderPost(post)
}

export default ViewPost;
