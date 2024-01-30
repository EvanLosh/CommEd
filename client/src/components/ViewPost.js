import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmitComment from "./SubmitComment";
import Comment from './Comment'



function ViewPost({ commonProps }) {
    const { post_id } = useParams()
    const [post, setPost] = useState(commonProps.blankPost)

    useEffect(() => {
        const url = commonProps.serverURL + '/posts/' + post_id
        console.log(url)
        fetch(url)
            .then(r => r.json())
            .then(r => setPost(r))
    }, [])



    function renderComments(c, type) {

        let post_id = null
        if (type === 'comment') {
            post_id = c.post_id
        }
        if (type === 'post') {
            post_id = c.id
        }
        if ((c) && (c.comments) && c.comments.length > 0) {
            return <div>
                {c.comments.map((child) => {
                    return <Comment key={c.id} comment={child} commonProps={commonProps} post_id={post_id} renderComments={renderComments} />
                })}
            </div>
        }
        else {
            return null
        }
    }

    function addTag(newTag) {

    }



    function renderPost(p) {
        return <div id="view-post">
            <h1>{p.title}</h1>
            {commonProps.renderDatetimeAndAuthor(p)}
            {commonProps.renderTags(p.tags)}
            <h3>Problem:</h3>
            <p>{p.problem_body}</p>
            <h3>Answer:</h3>
            <p>{p.answer_body}</p>
            <h3>Solution:</h3>
            <p>{p.solution_body}</p>
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
