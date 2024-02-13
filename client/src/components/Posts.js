import React, { useState, useEffect } from "react";
import PostCardList from "./PostCardList";
import { prepareDataForValidation } from "formik";


function Posts({ commonProps }) {


    const [posts, setPosts] = useState([])
    const [filterCriteria, setFilterCriteria] = useState({
        title: '',
        author: '',
        publishedAfter: '',
        publishedBefore: '',
        tags: [{ tag: '' }],
    })
    const [sortCriteria, setSortCriteria] = useState({
        field: 'datetime_created',
        ascending: false
    })

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

    function handleChange(e) {
        setFilterCriteria({ ...filterCriteria, [e.target.name]: e.target.value })
    }


    const filteredPosts = posts
        .filter((p) => p.title.toUpperCase().includes(filterCriteria.title.toUpperCase()))
        .filter((p) => p.owner.username.toUpperCase().includes(filterCriteria.author.toUpperCase()))




    const searchAndFilterForm = <form>
        <div className='form-line'>
            <label>Title contains:</label>
            <input name='title' value={filterCriteria.title} onChange={handleChange} ></input>
        </div>
        <div className='form-line'>
            <label>Author contains:</label>
            <input name='author' value={filterCriteria.author} onChange={handleChange}></input>
        </div>
        <div className='form-line'>
            <label>Published after:</label>
            <input value='Work in progress'></input>
        </div>
        <div className='form-line'>
            <label>Published before:</label>
            <input value='Work in progress'></input>
        </div>
        <div className='form-line'>
            <label>Tags (separated by commas):</label>
            <input value='Work in progress'></input>
        </div>
    </form>

    function handleReverseSort(e) {
        setSortCriteria({ ...sortCriteria, ascending: !sortCriteria.ascending })
    }

    const sortForm = <select>
        <option value='title' name='title'>Title</option>
        <option value='author' name='author'>Author</option>
        <option value='datetime_created' name='datetime_created'>Published date</option>
        <option value='datetime_last_edited' name='datetime_last_edited'>Last edited date</option>
    </select>

    const reverseSortButton = <button onClick={handleReverseSort}>Reverse sort</button>





    return <div id="posts">
        <h2 className="commed-style">Posts</h2>
        <div id='filter-and-sort'>
            <p>Filter options:</p>
            {searchAndFilterForm}
            <p>Sort options:</p>
            <div>
                {sortForm}
                {reverseSortButton}
            </div>
        </div>
        <PostCardList commonProps={commonProps} posts={filteredPosts} removable={false} />
    </div>;
}

export default Posts;