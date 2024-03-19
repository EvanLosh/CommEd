import React, { useState, useEffect } from "react";
import { useFormik } from 'formik'
import './Edit.css'



function Edit({ commonProps, originalPost, renderCreateAndEditPostForm, tags }) {
    // console.log(originalPost)

    let initialValues = { ...originalPost, tags: tags }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            // values.tags = tags

            fetch(commonProps.serverURL + '/posts/' + originalPost.id,
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${commonProps.authJWT}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                .then((r) => {
                    if (!r.ok) {
                        // console.log(r.json())
                        throw new Error('Network response was not ok');
                    }
                    return r.json()
                })
                .then((r) => {

                    window.location.href = commonProps.websiteURL + '/view-post/' + r.id
                })
        }
        , enableReinitialize: true
    }
    )



    return <div id="edit-form">
        {commonProps.user.id === originalPost.owner_id ?
            <div>
                <h3 className='commed-style'>Use this form to edit your post</h3>
                {renderCreateAndEditPostForm(formik)}
            </div>
            :
            <p>You do not have permission to edit this post. <a href='/sign-in-or-sign-up'>Sign in</a> or <a href='/'>Return home</a></p>
        }
    </div>;
}

export default Edit;
