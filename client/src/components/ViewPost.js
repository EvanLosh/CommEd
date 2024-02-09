import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmitComment from "./SubmitComment";
import Comment from './Comment'
import { Tex, InlineTex } from 'react-tex'
import parse from 'html-react-parser'



function ViewPost({ commonProps }) {
    const { post_id } = useParams()
    const [post, setPost] = useState(commonProps.blankPost)
    console.log(post)

    useEffect(() => {
        const url = commonProps.serverURL + '/posts/' + post_id
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






    function renderPost(p) {
        return <div id="view-post">
            <div><InlineTex texContent={p.title} /></div>
            {commonProps.renderDatetimeAndAuthor(p)}
            {p.owner.id === commonProps.user.id ? commonProps.renderDelete(p) : null}
            {commonProps.renderTags(p.tags)}
            {parseInt(commonProps.user.id) === parseInt(p.owner.id) ? <p onClick={() => window.location.href = commonProps.websiteURL + '/edit-post/' + p.id}>Edit</p> : null}
            <h3>Problem:</h3>
            <div><InlineTex texContent={p.problem_body} /></div>
            <h3>Answer:</h3>
            <div><InlineTex texContent={p.answer_body} /></div>
            <h3>Solution:</h3>
            <div><InlineTex texContent={p.solution_body} /></div>
            <h3>Refernces:</h3>
            <p>{p.references}</p>
            <h3>Comments:</h3>
            <SubmitComment commonProps={commonProps} parent_id={null} post_id={p.id} />
            {renderComments(p, 'post')}
        </div>
    }

    return renderPost(post)
}

export default ViewPost;
