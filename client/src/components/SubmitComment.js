import React from "react";
import { useFormik } from 'formik'
import './SubmitComment.css'



function SubmitComment({ commonProps, parent_id, post_id }) {

    const formik = useFormik(
        {
            initialValues: {
                body: '',
                owner_id: commonProps.user.id,
                post_id: post_id,
                parent_id: parent_id,
            },
            onSubmit: (values) => {
                values.post_id = post_id
                values.owner_id = commonProps.user.id

                fetch(commonProps.serverURL + '/comments', {
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
                        window.location.reload()
                    })
            }
        }
    )

    const form = <div className='submit-comment'>
        <form onSubmit={formik.handleSubmit}>
            {/* <label htmlFor='body'>Comment: </label> */}
            <textarea type='body' id='body' name='body' value={formik.values.body} onChange={formik.handleChange}></textarea>
            <br></br>
            <input type="submit" value="Submit comment" />
        </form>
        <div className="white-space"></div>
    </div>


    return commonProps.user.id > 0 ? form : <a href='/sign-in-or-sign-up'>Sign in to comment</a>
}

export default SubmitComment;
