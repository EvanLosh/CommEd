import React, { useState, useEffect } from "react";
import { useFormik } from 'formik'


function Create({ commonProps, renderCreateAndEditPostForm, tags }) {

    const initialValues = commonProps.blankPost
    initialValues.owner_id = commonProps.user.id
    initialValues.tags = tags

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            // debugger
            values.tags = tags
            const stuffToSend = {
                method: 'POST',
                headers: {
                    'Authorization': "Bearer " + commonProps.getAccessToken(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
            console.log(commonProps.getAccessToken())
            console.log(stuffToSend)
            fetch(commonProps.serverURL + '/posts', stuffToSend)
                .then((r) => {
                    if (!r.ok) {

                        throw new Error('Network response was not ok');
                    }
                    return r.json()
                })
                .then((r) => {
                    debugger
                    window.location.href = commonProps.websiteURL + '/view-post/' + r.id
                })
        }
    }
    )


    return <div id="create-form">
        {
            commonProps.user.id > 0
                ?
                <div>
                    <h3 className='commed-style'>Use this form to create a new post</h3>
                    {renderCreateAndEditPostForm(formik)}
                </div>
                :
                <a href='/sign-in-or-sign-up'>Sign in to create posts</a>
        }
    </div>;
}

export default Create;
