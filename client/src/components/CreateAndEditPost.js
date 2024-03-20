import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Create from './Create'
import EditPostFetcher from "./EditPostFetcher";
import TagForm from "./TagForm";
import './CreateAndEditPost.css';



function CreateAndEditPost({ commonProps, child }) {
    const { post_id } = useParams()
    const [tags, setTags] = useState([])

    function addTag(tag) {
        setTags((previousTags) => [...previousTags, tag])

    }

    function removeTag(tag_text) {
        const remainingTags = tags.filter(t => t.text !== tag_text)
        setTags(remainingTags)
    }


    function renderCreateAndEditPostForm(formik) {
        const handleStatusRadio = (e) => {
            formik.values.status = e.target.value
        }

   

        return <div className='create-and-edit-form'>
            <div className='create-and-edit-tips'>

                <p>New to TeX? Any text surrounded by double dollar signs is interpreted as TeX code after submitting. Try copying the following code into your post and see what it renders after you submit your post.</p>
                <p className='code'>{"$$ \\int_a^b f(x) \\mathrm\{d\}x $$"}</p>
                <p><a href='https://atomurl.net/math/'>https://atomurl.net/math/</a> can generate TeX code for you through a GUI.</p>
                <p>A thorough guide to TeX code is available from <a href='https://mirror.math.princeton.edu/pub/CTAN/info/short-math-guide/short-math-guide.pdf'>The American Mathematical Society</a>.</p>
                <p>Tip: Changes are NOT saved automatically. You can submit your post as a draft, making it hidden from other users until you publish it.</p>
            </div>

            <TagForm commonProps={commonProps} tags={tags} addTag={addTag} removeTag={removeTag} />
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
                {/* <div id='draft-publish-line'>
                    <input type='radio' id='draft' name='status' value={'draft'} onChange={handleStatusRadio}></input>
                    <label htmlFor='draft'>Save draft</label>
                    <input type='radio' id='publish' name='status' value={'publish'} onChange={handleStatusRadio}></input>
                    <label htmlFor='publish'>Publish (you can edit your post after publishing it)</label>
                    <br></br>
                </div> */}
                <input id='create-and-edit-submit' className='button' type="submit" value="Submit" />
            </form>
        </div >
    }


    let childComponent = null
    if (child === 'create') {
        childComponent = <Create commonProps={commonProps} renderCreateAndEditPostForm={renderCreateAndEditPostForm} tags={tags} />
    }
    if (child === 'edit') {
        childComponent = <EditPostFetcher post_id={post_id} commonProps={commonProps} renderCreateAndEditPostForm={renderCreateAndEditPostForm} tags={tags} addTag={addTag} />
    }


    return <div id="create-and-edit-forms">
        {childComponent}
    </div>;
}

export default CreateAndEditPost;
