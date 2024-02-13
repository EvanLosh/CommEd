import React, { useState } from "react";
import SubmitComment from "./SubmitComment";
import { Tex, InlineTex } from 'react-tex'
import './Comment.css'


function Comment({ commonProps, comment, renderComments, parent_id, post_id }) {
    const [replying, setReplying] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editField, setEditField] = useState(comment.body)

    function renderReplyElement() {
        // console.log('rendering reply element on comment parent_id = ' + parent_id)
        return replying
            ?
            <div>
                <p onClick={() => setReplying(false)} className='commed-style'>cancel</p>
                <SubmitComment commonProps={commonProps} replying={replying} parent_id={comment.id} post_id={post_id} />
            </div>
            :
            <p onClick={() => setReplying(true)} className='commed-style'>Reply</p>;
    }

    function handleChange(e) {
        setEditField(e.target.value)
    }

    function handleEditSubmit(e) {
        e.preventDefault()
        fetch(commonProps.serverURL + '/comments/' + comment.id,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: editField })
            })
            .then(r => r.json())
            .then(r => {
                window.location.reload()
            })
    }


    const editCommentForm = editing && comment.owner.id === commonProps.user.id ?
        <form className='edit-comment'>
            <label htmlFor='edit-comment'>edit comment</label>
            <textarea className='edit-comment' name='edit-comment' value={editField} onChange={handleChange}></textarea>
            <button onClick={handleEditSubmit} >Submit</button>
            <p onClick={() => setEditing(false)}>cancel</p>
        </form>
        :
        <div><InlineTex texContent={comment.body} /></div>


    const editButton = comment.owner.id === commonProps.user.id
        ?
        < div >
            {comment.owner.id === commonProps.user.id ? <p onClick={() => setEditing(true)} className='commed-style'>Edit</p> : null}
        </ div>
        : null


    let commentElement
    // console.log(comment)
    // console.log('owner.id is ' + comment.owner.id + '. user.id is ' + commonProps.user.id + '.')
    if (comment && comment.owner && comment.id && comment.owner.username) {
        commentElement = <div className="comment" >
            {commonProps.renderDatetimeAndAuthor(comment)}
            {editCommentForm}
            <div className='comment-options-line'>
                {renderReplyElement()}
                {editButton}
                {parseInt(comment.owner.id) === parseInt(commonProps.user.id) ? commonProps.renderDelete(comment) : null}
            </div>
            {renderComments(comment, 'comment')}
        </div>
    }


    return commentElement

}

export default Comment;
