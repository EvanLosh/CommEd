import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Create from './Create'
import EditFetcher from "./EditPostFetcher";
import TagForm from "./TagForm";
import './CreateAndEditPost.css';



function CreateAndEditPost({ commonProps, child }) {
    const { post_id } = useParams()
    const [tags, setTags] = useState([])

    function addTag(tag) {
        setTags([...tags, tag])
    }


    function renderCreateAndEditPostForm(formik) {
        const handleStatusRadio = (e) => {
            formik.values.status = e.target.value
            console.log(e.target.value)
            console.log(formik.values.status)
        }

        return <div className='create-and-edit-form'>
            <p>
                Create new post

            </p>
            <TagForm commonProps={commonProps} tags={tags} addTag={addTag} />
            <form id='create-and-edit-post-form' onSubmit={formik.handleSubmit}>
                <div className='text-form'>

                    <label htmlFor='title'>Title: </label>
                    <textarea type='title' id='title' name='title' value={formik.values.title} onChange={formik.handleChange}></textarea>
                    <br></br>
                    <br></br>
                    <label htmlFor='problem_body'>Problem: </label>
                    <textarea type='problem_body' id='problem_body' name='problem_body' value={formik.values.problem_body} onChange={formik.handleChange}></textarea>
                    <br></br>
                    <label htmlFor='answer_body'>Answer: </label>
                    <textarea type='answer_body' id='answer_body' name='answer_body' value={formik.values.answer_body} onChange={formik.handleChange}></textarea>
                    <br></br>
                    <label htmlFor='solution_body'>Solution: </label>
                    <textarea type='solution_body' id='solution_body' name='solution_body' value={formik.values.solution_body} onChange={formik.handleChange}></textarea>
                    <br></br>
                    <label htmlFor='references'>Refernces: </label>
                    <textarea type='references' id='references' name='references' value={formik.values.references} onChange={formik.handleChange}></textarea>
                    <br></br>
                </div>
                <input type='radio' id='draft' name='draft' value={'draft'} checked={formik.values.status === 'draft'} onChange={handleStatusRadio}></input>
                <label htmlFor='draft'>Save draft</label>
                <input type='radio' id='publish' name='publish' value={'publish'} checked={formik.values.status === 'publish'} onChange={handleStatusRadio}></input>
                <label htmlFor='publish'>Publish (you can edit your post after publishing it)</label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        </div >
    }


    let childComponent = null
    if (child === 'create') {
        childComponent = <Create commonProps={commonProps} renderCreateAndEditPostForm={renderCreateAndEditPostForm} tags={tags} />
    }
    if (child === 'edit') {
        childComponent = <EditFetcher post_id={post_id} commonProps={commonProps} renderCreateAndEditPostForm={renderCreateAndEditPostForm} tags={tags} />
    }


    return <div id="create-and-edit-forms">
        {childComponent}
    </div>;
}

export default CreateAndEditPost;
