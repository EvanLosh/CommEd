import React, { useState, useEffect } from "react";
import Edit from "./Edit";



function EditPostFetcher({ commonProps, post_id, renderCreateAndEditPostForm, tags, addTag }) {
    const [originalPost, setOriginalPost] = useState(commonProps.blankPost)
    // const [originalPost, setOriginalPost] = useState({ ...commonProps.blankPost, title: 'gibberish' })

    useEffect(() => {
        const url = commonProps.serverURL + '/posts/' + post_id
        fetch(url)
            .then(r => r.json())
            .then((r) => {
                console.log(r)
                setOriginalPost(r)
            })
    }, [])

    useEffect(() => { originalPost.tags.forEach(t => addTag(t)) }, [originalPost])





    return <Edit commonProps={commonProps} originalPost={originalPost} renderCreateAndEditPostForm={renderCreateAndEditPostForm} tags={tags} />
}

export default EditPostFetcher;
