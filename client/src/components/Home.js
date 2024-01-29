import React, { useEffect, useState } from "react";
import "./Home.css";
import Browse from './Browse'

function Home({ serverURL, loginSession }) {

    const blankPosts = [{
        title: '',
        id: -1,
        datetime_created: '',
        datetime_last_edited: '',
        owner: { username: '', id: -1 },
        num_comments: 0,
        post_tags: [{ tag: { text: '' } }]
    }]

    const [posts, setPosts] = useState(blankPosts)

    function fetchPosts() {
        fetch(serverURL + '/posts')
            .then(r => r.json())
            .then((r) => {
                console.log(r)
                if (r.length > 0) {
                    setPosts(r)
                }
            })
    }

    useEffect(fetchPosts, [])



    return (
        <div id="home">
            <Browse posts={posts} />
        </div>
    );
}

export default Home;
