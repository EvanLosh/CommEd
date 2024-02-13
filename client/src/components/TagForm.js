import React, { useState } from "react";



function TagForm({ commonProps, tags, addTag }) {

    const [newTag, setNewTag] = useState('')

    const handleTagSubmit = (e) => {
        e.preventDefault()
        // console.log('e.target.value is ' + e.target.tag.value)
        if (!tags.includes(e.target.tag.value)) {
            addTag({ text: e.target.tag.value })
            setNewTag('')
        }
        // console.log('tags is ' + tags.map(t => t.text))
    }

    function renderAddTagForm() {
        return <form onSubmit={handleTagSubmit} className='add-tag-form'>
            {/* <label htmlFor='tag'>Enter a tag:</label> */}
            <input type='submit' value='Add tag' ></input>
            <input type='text' id='tag-input' name='tag' value={newTag} onChange={(e) => setNewTag(e.target.value)}></input>
        </form>
    }



    return <div id="tag-form">
        {renderAddTagForm()}
        {commonProps.renderTags(tags)}
    </div>;
}

export default TagForm;
