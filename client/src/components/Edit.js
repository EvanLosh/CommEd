import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from 'formik'



function Edit({ commonProps, post_id }) {
    const [originalPost, setOriginalPost] = useState(commonProps.blankPost)

    useEffect(() => {
        const url = commonProps.serverURL + '/posts/' + post_id
        fetch(url)
            .then(r => r.json())
            .then((r) => {
                console.log(r)
                setOriginalPost(r)
            })
    }, [])

    const formik = useFormik({
        initialValues: originalPost,
        onSubmit: (values) => {
            // values.tags = tags
            console.log(values)
            fetch(commonProps.serverURL + '/posts/' + post_id,
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
                    console.log('Patched post: ' + r.id)
                    window.location.href = commonProps.websiteURL + '/view-post/' + r.id
                })
        }
    }
    )

    const form = <div className='create-and-edit-form'>
        <p>
            Create new post

        </p>
        {/* {renderAddTagForm()} */}
        {commonProps.renderTags(formik.values.tags)}
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input type='title' id='title' name='title' value={formik.values.title} onChange={formik.handleChange}></input>
            <br></br>
            <br></br>
            <label htmlFor='problem_body'>Problem: </label>
            <input type='problem_body' id='problem_body' name='problem_body' value={formik.values.problem_body} onChange={formik.handleChange}></input>
            <br></br>
            <label htmlFor='answer_body'>Answer: </label>
            <input type='answer_body' id='answer_body' name='answer_body' value={formik.values.answer_body} onChange={formik.handleChange}></input>
            <br></br>
            <label htmlFor='solution_body'>Solution: </label>
            <input type='solution_body' id='solution_body' name='solution_body' value={formik.values.solution_body} onChange={formik.handleChange}></input>
            <br></br>
            <label htmlFor='references'>Refernces: </label>
            <input type='references' id='references' name='references' value={formik.values.references} onChange={formik.handleChange}></input>
            <br></br>
            <input type="submit" value="Publish" />
        </form>
    </div>



    return <div id="create-and-edit">
        {form}
    </div>;
}

export default Edit;
