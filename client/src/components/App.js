import React, { useEffect, useState, } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import About from './About'
import SignInOrSignUp from "./SignInOrSignUp";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import PlaylistFetcher from "./PlaylistFetcher";
import ViewPost from "./ViewPost";
import CreateAndEditPost from "./CreateAndEditPost";
import ErrorBoundary from "./ErrorBoundary";
import Posts from "./Posts";
import Playlists from "./Playlists";
// import Profile from './Profile'



const serverURL = "http://127.0.0.1:5000"
const websiteURL = "http://127.0.0.1:3000"
const blankUser = {
  id: -1,
  username: '',
  email: '',
  datetimeCreated: ''
}
const blankComment = {
  body: '',
  owner: { username: '', id: -1 },
  datetime_created: '',
  datetime_last_edited: '',
  children: []
}
const blankPost = {
  title: '',
  id: -1,
  datetime_created: '',
  datetime_last_edited: '',
  owner: { username: '', id: -1 },
  problem_body: '',
  answer_body: '',
  solution_body: '',
  references: '',
  tags: [],
  comments: [],
  status: 'published'
}
const blankPlaylist = [{
  title: '',
  owner_id: -1,
  owner: { username: '', id: -1 },
  datetime_created: '',
  datetime_last_edited: '',
  posts: [],
  status: ''
}]
function renderTags(listOfTags = [], removable = false, handleClick = null) {
  let tagElements = listOfTags
    // .filter((tag) => {
    //   return !(tag.text in )
    // })
    .map((tag) => {
      if (!('id' in tag)) {
        tag.id = tag.text
      }
      const removeButton = removable ? <button className='tag-remove-button' onClick={() => handleClick(tag.text)}> 🗙 </button> : null
      return <div key={tag.id} className="tag"><p>{tag.text} </p>{removeButton} </div>
    })
  return <div className="tag-list ">
    <p className='tag-label commed-style'>Tags: </p>
    {tagElements}
  </div>
}

function App() {

  function getAccessToken() {
    const authJWTString = sessionStorage.getItem('access_token')
    if (authJWTString) {
      return authJWTString
    }
    else {
      return null
    }
  }

  function setAccessToken(x) {
    // console.log('setting access token to ', JSON.stringify(x))
    // sessionStorage.setItem('access_token', JSON.stringify(x))
    sessionStorage.setItem('access_token', x)
  }

  function getSessionUser() {
    const sessionUserString = sessionStorage.getItem('sessionUser');
    if (sessionUserString) {
      const sessionUser = JSON.parse(sessionUserString);
      return sessionUser
    }
    else {
      return blankUser
    }
  }
  // User login session
  const [user, setUser] = useState(getSessionUser)


  function setSessionUser(user) {
    const sessionUser = {
      username: user.username,
      email: user.email,
      email_is_verified: user.email_is_verified,
      datetime_created: user.datetime_created,
      id: user.id
    }
    sessionStorage.setItem('sessionUser', JSON.stringify(sessionUser))
  }

  function login(user) {
    fetch(commonProps.serverURL + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        // Handle successful response
        if ('access_token' in data) {
          // save user in sessionStorage, save access token in sessionStorage, and set user state
          setSessionUser(data.user)
          setAccessToken(data.access_token)
          setUser(data.user)
        }

        else {
          console.log('login failed')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function logout() {
    setSessionUser(blankUser)
    setUser(getSessionUser())
    window.location.reload()
  }
  useEffect(() => {
    const sessionUser = getSessionUser()
    console.log('Session user is ')
    console.log(sessionUser)
    if (sessionUser?.id > 0) {
      setUser(sessionUser)
      // if (sessionUser === user) {
      //   // App.js must rerender after 
      //   forceUpdate()
      // }
      // else {
      //   setUser(sessionUser)
      // }
    }
  }, [])


  function renderDatetimeAndAuthor(x = { owner: { username: '' }, datetime_created: '' }) {
    let edited = ''
    const created = x.datetime_created
    // const name = 'x.owner.username cannot read properties of undefined. reading: username.'
    let name = null
    if (x && ('owner' in x) && ('username' in x.owner)) {
      name = x.owner.username
    }
    if (x.datetime_last_edited) {
      edited = 'Edited on ' + x.datetime_last_edited + ' | Published on '
    }
    return <p className='datetime-and-author'>{edited + created} | {name}</p>

  }

  function renderDelete(x) {
    function onDelete(x) {

      let route = ''
      if ('problem_body' in x) {
        route = '/posts/'
      }
      else if ('body' in x) {
        route = '/comments/'
      }
      else if ('posts' in x) {
        route = '/playlists/'
      }
      const url = serverURL + route + x.id

      fetch(url,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${commonProps.authJWT}`,
          }
        })
        .then(() => {
          if (route === 'posts') {
            window.location.href = websiteURL
          }
          else {
            window.location.reload()
          }
        })
    }
    let item = ''
    if ('problem_body' in x) {
      item = 'post'
    }
    else if ('body' in x) {
      item = 'comment'
    }
    else if ('posts' in x) {
      item = 'playlist'
    }
    return <div className={'delete'}>
      <p onClick={() => onDelete(x)} className='commed-style button delete'>Delete {item}</p>
    </div >

  }

  const commonProps = {
    serverURL: serverURL,
    websiteURL: websiteURL,
    blankUser: blankUser,
    blankComment: blankComment,
    blankPost: blankPost,
    blankPlaylist: blankPlaylist,
    user: user,
    getAccessToken: getAccessToken,
    renderDatetimeAndAuthor: renderDatetimeAndAuthor,
    renderTags: renderTags,
    renderDelete: renderDelete
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home commonProps={commonProps} />,
      children: [],
    },
    {
      path: "/posts",
      element: <Posts commonProps={commonProps} />,
      children: [],
    },
    {
      path: "/playlists",
      element: <Playlists commonProps={commonProps} />,
      children: [],
    },
    {
      path: 'about',
      element: <About />
    },
    {
      path: '/create',
      element: <CreateAndEditPost commonProps={commonProps} child={'create'} />
    },
    {
      path: '/edit-post/:post_id',
      element: <CreateAndEditPost commonProps={commonProps} child={'edit'} />,
      errorElement: < ErrorBoundary commonProps={commonProps} />
    },
    {
      path: '/view-post/:post_id',
      element: <ViewPost commonProps={commonProps} />,
      errorElement: < ErrorBoundary commonProps={commonProps} />
    },
    {
      path: '/view-playlist/:playlist_id',
      element: <PlaylistFetcher commonProps={commonProps} />,
      errorElement: < ErrorBoundary commonProps={commonProps} />
    },
    // {
    //   path: '/profile',
    //   element: <Profile commonProps={commonProps} />,
    //   errorElement: < ErrorBoundary commonProps={commonProps} />
    // },
    {
      path: "/sign-in-or-sign-up",
      element: <SignInOrSignUp login={login} logout={logout} commonProps={commonProps} />,
    },
  ]);


  return (
    <div id="app">
      <Header commonProps={commonProps} getSessionUser={getSessionUser} logout={logout} />
      <RouterProvider router={router} />
      <Footer />
      <div id='space-at-the-bottom-of-the-webpage'></div>
    </div>
  );
}

export default App;