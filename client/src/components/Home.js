import React, { useEffect, useState } from "react";
import "./Home.css";
import Browse from './Browse'

function Home({ commonProps }) {



    const [posts, setPosts] = useState([commonProps.blankPost])

    function fetchPosts() {
        fetch(commonProps.serverURL + '/posts')
            .then(r => r.json())
            .then((r) => {

                if (r.length > 0) {
                    setPosts(r)
                }
            })
    }

    useEffect(fetchPosts, [])



    return (
        <div id="home">
            <Browse posts={posts} commonProps={commonProps} />
        </div>
    );
}

export default Home;
