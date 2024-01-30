import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



function CreateAndEdit({ commonProps }) {
    const { post_id } = useParams()
    const [originalPost, setOriginalPost] = useState(commonProps.blankPost)


    useEffect(() => {
        const url = commonProps.serverURL + '/posts/' + post_id
        // console.log(url)
        fetch(url)
            .then(r => r.json())
            .then(r => setOriginalPost(r))
    }, [post_id])



    return <div id="create-and-edit">
    </div>;
}

export default CreateAndEdit;
