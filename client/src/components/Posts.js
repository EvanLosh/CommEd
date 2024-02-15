import React, { useState, useEffect } from "react";
import PostCardList from "./PostCardList";
import './Posts.css'


function Posts({ commonProps }) {


    const [posts, setPosts] = useState([])
    const [filterCriteria, setFilterCriteria] = useState({
        title: '',
        author: '',
        publishedAfter: '',
        publishedBefore: '',
        tags: '',
    })
    const [sortCriteria, setSortCriteria] = useState({
        selection: 'datetime_created',
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
        .filter((p) => {
            if (filterCriteria.publishedAfter) {
                return p.datetime_created > filterCriteria.publishedAfter
            }
            else {
                return true
            }
        })
        .filter((p) => {
            if (filterCriteria.publishedBefore) {
                return p.datetime_created < filterCriteria.publishedBefore
            }
            else {
                return true
            }
        })
        .filter((p) => {
            if (!filterCriteria.tags) {
                return true
            }
            let filterTags = filterCriteria.tags.split(',')
            let match = false
            filterTags.forEach((filterTag) => {
                p.tags.forEach((postTag) => {
                    if (postTag.text.toUpperCase().includes(filterTag.toUpperCase())) {
                        match = true
                    }
                })
            })
            return match
        })

    const sortedPosts = filteredPosts.sort((a, b) => {
        let stringA, stringB
        if (sortCriteria.selection === 'author') {
            stringA = a.owner.username.toUpperCase()
            stringB = a.owner.username.toUpperCase()
        }
        else {
            stringA = String(a[`${sortCriteria.selection}`]).toUpperCase()
            stringB = String(b[`${sortCriteria.selection}`]).toUpperCase()
        }
        console.log(stringA)
        if (sortCriteria.ascending) {
            return stringA.localeCompare(stringB)
        }
        else {
            return stringB.localeCompare(stringA)
        }
    })




    const searchAndFilterForm = <form>
        <div className='form-line'>
            <label>Title contains:
                <input name='title' value={filterCriteria.title} onChange={handleChange} ></input></label>
        </div>
        <div className='form-line'>
            <label>Author contains:
                <input name='author' value={filterCriteria.author} onChange={handleChange}></input></label>
        </div>
        <div className='form-line'>
            <label>Published after:
                <input name='publishedAfter' value={filterCriteria.publishedAfter} onChange={handleChange}></input></label>
        </div>
        <div className='form-line'>
            <label>Published before:
                <input name='publishedBefore' value={filterCriteria.publishedBefore} onChange={handleChange}></input></label>
        </div>
        <div className='form-line'>
            <label>Tags (separated by commas):
                <input name='tags' value={filterCriteria.tags} onChange={handleChange}></input></label>
        </div>
    </form>

    function handleReverseSort(e) {
        setSortCriteria({ ...sortCriteria, ascending: !sortCriteria.ascending })
    }

    function handleSelectChange(e) {
        console.log('Setting sort selection to ', e.target.value)
        setSortCriteria((previousSelection) => ({ ...previousSelection, selection: e.target.value }))
    }

    const sortForm = <select name='sort-select' onChange={handleSelectChange}>
        <option id='title' value='title' name='title'>Title</option>
        <option id='author' value='author' name='author'>Author</option>
        <option id='datetime_created' value='datetime_created' name='datetime_created'>Published date</option>
        <option id='datetime_created' value='datetime_last_edited' name='datetime_last_edited'>Last edited date</option>
    </select>

    const reverseSortButton = <button className='button' onClick={handleReverseSort}>Reverse order</button>


    function renderRemoveButton(post) {
        // PostCardList expects this function as a prop, but the function should do nothing unless the user is viewing one of their own playlists
        return null
    }


    return <div id="posts">
        <h3 className="commed-style">Posts</h3>
        <div id='filter-and-sort-forms'>
            <div id='filter-form'>
                <p>Filter and sort options:</p>
                {searchAndFilterForm}
            </div>
            <div id='sort-form'>
                <p>Sort by: </p>
                {sortForm}
                {reverseSortButton}
            </div>
        </div>
        <PostCardList commonProps={commonProps} posts={sortedPosts} removable={false} renderRemoveButton={renderRemoveButton} />
    </div>;
}

export default Posts;
