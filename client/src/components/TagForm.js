import React, { useState } from "react";
import './TagForm.css'



function TagForm({ commonProps, tags, addTag, removeTag }) {

    const [newTag, setNewTag] = useState('')

    const handleTagSubmit = (e) => {
        e.preventDefault()

        if (newTag.length > 0 && !tags.includes(newTag)) {
            addTag({ text: newTag })
            setNewTag('')
        }

    }

    function renderAddTagForm() {
        return <form onSubmit={handleTagSubmit} className='add-tag-form'>

            <input type='text' id='tag-input' name='tag' value={newTag} onChange={(e) => setNewTag(e.target.value)}></input>
            <input type='submit' id='tag-submit' value='Add tag' ></input>
        </form>
    }

    function handleRemoveTagClick(text) {
        removeTag(text)
    }



    return <div id="tag-form">
        {commonProps.renderTags(tags, true, handleRemoveTagClick)}
        {renderAddTagForm()}
    </div>;
}

export default TagForm;
