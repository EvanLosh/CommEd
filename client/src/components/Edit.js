import React, { useState, useEffect } from "react";
import { useFormik } from 'formik'
import './Edit.css'



function Edit({ commonProps, originalPost, renderCreateAndEditPostForm, tags }) {
    console.log(originalPost)

    const formik = useFormik({
        initialValues: originalPost,
        onSubmit: (values) => {
            values.tags = tags
            console.log('Submitting post: ')
            console.log(values)
            fetch(commonProps.serverURL + '/posts/' + originalPost.id,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                .then((r) => {
                    if (!r.ok) {
                        console.log(r.json())
                        throw new Error('Network response was not ok');
                    }
                    return r.json()
                })
                .then((r) => {
                    console.log('received OK response from server')
                    console.log(r)
                    window.location.href = commonProps.websiteURL + '/view-post/' + r.id
                })
        }
        , enableReinitialize: true
    }
    )



    return <div id="edit-form">
        <h3 className='commed-style'>Use this form to edit your post</h3>
        {renderCreateAndEditPostForm(formik)}
    </div>;
}

export default Edit;
