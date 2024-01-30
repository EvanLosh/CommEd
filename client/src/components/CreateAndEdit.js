import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from 'formik'
import Create from './Create'
import Edit from "./Edit";



function CreateAndEdit({ commonProps, child }) {
    const { post_id } = useParams()

    function addTag(newTag, post) {
        const values = { post_id: post_id, newTag: newTag }
        fetch(commonProps.serverURL + '/post/' + post_id, {
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
                console.log('Created new posts: ' + r.id)
                window.location.href = commonProps.websiteURL + '/view-post/' + r.id
            })
    }

    let childComponent
    if (child === 'create') {
        childComponent = <Create commonProps={commonProps} addTag={addTag} />
    }
    if (child === 'edit') {
        childComponent = <Edit post_id={post_id} commonProps={commonProps} addTag={addTag} />
    }


    return <div id="create-and-edit">
        {childComponent}
    </div>;
}

export default CreateAndEdit;
