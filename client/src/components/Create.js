import React, { useState, useEffect } from "react";
import { useFormik } from 'formik'


function Create({ commonProps, renderCreateAndEditPostForm, tags }) {

    const initialValues = commonProps.blankPost
    initialValues.owner_id = commonProps.user.id

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            values.tags = tags
            console.log(values)
            fetch(commonProps.serverURL + '/posts', {
                method: 'POST',
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
                    console.log('Created new posts: ' + r.id)
                    window.location.href = commonProps.websiteURL + '/view-post/' + r.id
                })
        }
    }
    )


    return <div id="create-form">
        <h3 className='commed-style'>Use this form to create a new post</h3>
        {commonProps.user.id > 0 ? renderCreateAndEditPostForm(formik) : <a href='/sign-in-or-sign-up'>Sign in to create posts</a>}
    </div>;
}

export default Create;
