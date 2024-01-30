import React, { useState, useEffect } from "react";
import { useFormik } from 'formik'


function Create({ commonProps }) {
    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState('')

    const formik = useFormik({
        initialValues: {
            ...commonProps.blankPost,
            owner_id: 9 // TODO: FIX THIS AFTER IMPLEMENTING USER LOGIN
        },
        onSubmit: (values) => {
            // values.tags = tags
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

    const handleTagSubmit = (e) => {
        console.log('e.target.value is ' + e.tag.value)
        e.preventDefault()
        if (!tags.includes(e.tag.value)) {
            setTags([...tags, { text: e.tag.value }])
            // setNewTag('')
        }
        console.log('tags is ' + tags)
    }

    function renderAddTagForm() {
        return <form onSubmit={handleTagSubmit}>
            <label htmlFor='tag'>Enter a tag:</label>
            <input type='tag' id='tag' name='tag' value={newTag} onChange={(e) => setNewTag(e.target.value)}></input>
            <input type='submit' value='Add tag' ></input>
        </form>
    }






    const form = <div className='create-and-edit-form'>
        <p>
            Create new post

        </p>
        {renderAddTagForm()}
        {commonProps.renderTags(tags)}
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

export default Create;
