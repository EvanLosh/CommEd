import React from "react";



function PostCard({ post }) {

    // console.log('PostCard is rendering: ')
    // console.log(post)

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

    const tagElements = post.post_tags.map((pt) => {
        return <div className="tag-list" key={`${pt.tag.id}`}>
            <p>{pt.tag.text}
            </p>
        </div>
    })
    const postCard = <div >
        <p>{post.title}</p>
        <p>Tags: </p>
        {tagElements}
        {renderDatetimeAndAuthor(post)}
    </div>

    return <div className="post-card">
        {postCard}
    </div>;
}

export default PostCard;
