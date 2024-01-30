import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



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

    function renderComment(c) {
        let childElements = []
        console.log(c.children)
        if ((c) && (c.children) && c.children.length > 0) {
            childElements = <div>
                {c.children.map((child) => {
                    return renderComment(child)
                })}
            </div>
            return <div className="comment" key={`${c.id}`}>
                {commonProps.renderDatetimeAndAuthor(c)}
                <p>{c.body}</p>
                {childElements}
            </div>
        }
    }

    function renderRootComments(p) {
        if ((p) && (p.comments) && (p.comments.length > 0)) {
            return <div id="view-post-comments">
                {p.comments
                    // .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((c) => {
                        return renderComment(c)
                    })}
            </div>
        }
    }

    function renderPost(p) {
        console.log(p.comments)
        return <div>
            <h1>{p.title}</h1>
            {commonProps.renderDatetimeAndAuthor(p)}
            <h3>Problem:</h3>
            <p>{p.problem_body}</p>
            <h3>Answer:</h3>
            <p>{p.answer_body}</p>
            <h3>Solution:</h3>
            <p>{p.solution_body}</p>
            <h3>Refernces:</h3>
            <p>{p.references}</p>
            <h3>Comments:</h3>
            {renderRootComments(p)}
        </div>
    }

    return <div id="view-post">
        {renderPost(post)}
    </div>;
}

export default ViewPost;
