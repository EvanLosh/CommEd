import React from "react";
import { useFormik } from 'formik'



function SubmitComment({ commonProps, parent_id, post_id }) {

    const formik = useFormik(
        {
            initialValues: {
                body: '',
                owner_id: 9,
                post_id: post_id, // for some crazy reason, post_id is not correct
                parent_id: parent_id, // same problem
            },
            onSubmit: (values) => {
                values.post_id = post_id // this post_id is correct
                // values.parent_id = parent_id // this parent_id is NOT correct
                console.log(values)
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
            <input type='body' id='body' name='body' value={formik.values.body} onChange={formik.handleChange}></input>
            <br></br>
            <input type="submit" value="Submit comment" />
        </form>
    </div>


    return form
}

export default SubmitComment;
