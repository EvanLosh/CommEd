import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const blankPost = {
    title: '',
    id: -1,
    datetime_created: '',
    datetime_last_edited: '',
    owner: { username: '', id: -1 },
    num_comments: 0,
    problem_body: '',
    answer_body: '',
    solution_body: '',
    references: '',
    post_tags: [{ tag: { text: '' } }],
    comments: [{
        body: '',
        owner: { username: '', id: -1 },
        datetime_created: '',
        datetime_last_edited: '',
    }]
}

function ViewPost({ serverURL }) {
    const { post_id } = useParams()
    const [post, setPost] = useState(blankPost)

    useEffect(() => {
        const url = serverURL + '/posts/' + post_id
        console.log(url)
        fetch(url)
            .then(r => r.json())
            .then(r => setPost(r))
    }, [post_id])

    function renderDatetimeAndAuthor(x) {
        let edited = ''
        const created = x.datetime_created
        if (x.datetime_last_edited) {
            edited = 'Edited on ' + x.datetime_last_edited + ' | '
        }
        return <div className="comment">
            <p>{edited + created} | {x.owner.username}</p>
        </div>
    }

    function renderComment(c) {
        let childElements = null
        if (c.children.length > 0) {
            childElements = c.children.map((child) => {
                return renderComment(child)
            })
        }

        return <div className={`comment ${'root' ? c.parent_id : 'child'}`} key={`${c.id}`}>
            <p>{c.body}</p>
            {renderDatetimeAndAuthor(c)}
            {childElements}
        </div>
    }

    function renderPost(p) {
        return <div>
            <h1>{p.title}</h1>
            {renderDatetimeAndAuthor(p)}
            <h3>Problem:</h3>
            <p>{p.problem_body}</p>
            <h3>Answer:</h3>
            <p>{p.answer_body}</p>
            <h3>Solution:</h3>
            <p>{p.solution_body}</p>
            <h3>Refernces:</h3>
            <p>{p.references}</p>
            <h3>Comments:</h3>
            <div id="view-post-comments">
                {p.comments.sort((a, b) => new Date(b.date) - new Date(a.date)).map((c) => {
                    return renderComment(c)
                })}
            </div>
        </div>
    }

    return <div id="view-post">
        {renderPost(post)}
    </div>;
}

export default ViewPost;
