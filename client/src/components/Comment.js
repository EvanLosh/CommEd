import React, { useState } from "react";
import SubmitComment from "./SubmitComment";


function Comment({ commonProps, comment, renderComments, parent_id, post_id }) {
    const [replying, setReplying] = useState(false)

    function renderReplyElement() {
        console.log('rendering reply element on comment parent_id = ' + parent_id)
        return replying
            ?
            <div>
                <p onClick={() => setReplying(false)}>cancel</p>
                <SubmitComment commonProps={commonProps} replying={replying} parent_id={comment.id} post_id={post_id} />
            </div>
            :
            <p onClick={() => setReplying(true)}>reply</p>;
    }

    let commentElement
    if (comment && comment.owner && comment.id && comment.owner.username) {
        commentElement = <div className="comment needs-a-key" >
            {commonProps.renderDatetimeAndAuthor(comment)}
            <p>{comment.body}</p>
            {renderReplyElement()}
            {renderComments(comment, 'comment')}
        </div>
    }


    return commentElement

}

export default Comment;
