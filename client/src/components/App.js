import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import Home from "./Home";
import About from './About'
import SignInOrSignUp from "./SignInOrSignUp";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import ViewPlaylist from "./ViewPlaylist";
import ViewPost from "./ViewPost";
import CreateAndEdit from "./CreateAndEdit";


const serverURL = "http://127.0.0.1:5000";
const websiteURL = "http://127.0.0.1:3000"
const blankUser = {
  id: 9,
  username: 'dev',
  email: 'dev',
  datetimeCreated: ''
}
const blankComment = {
  body: '',
  owner: { username: '', id: -1 },
  datetime_created: '',
  datetime_last_edited: '',
  children: [{}]
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
  tags: [{ text: '', id: -1 }],
  comments: [blankComment],
  status: ''
}
const blankPlaylist = [{
  title: '',
  owner_id: -1,
  owner: { username: '', id: -1 },
  datetime_created: '',
  datetime_last_edited: '',
  posts: [blankPost],
  status: ''
}]
function renderTags(listOfTags = []) {
  let tagElements = listOfTags.map((tag) => {
    return <p key={tag.id} className="tag">{tag.text}</p>
  })
  return <div className="tag-list">
    <p>Tags: </p>
    {tagElements}
  </div>
}

function App() {
  const [users, setUsers] = useState([blankUser])
  const [loginSession, setLoginSession] = useState({ user: blankUser, loggedIn: false })

  function login(user) {
    setLoginSession({ user: user, loggedIn: true })
  }

  function logout() {
    setLoginSession({ user: blankUser, loggedIn: false })
  }

  function addUser(user) {
    setUsers([...users, user])
  }


  function fetchUsers() {
    fetch(serverURL + '/users', { method: 'GET' })
      .then(r => r.json())
      .then((r) => {
        if (r) {
          setUsers(r)
        }
      })
  }

  useEffect(fetchUsers, [])

  function handleUserChange(id) {
    id = parseInt(id)
    const u = users.filter(u => u.id === id)[0]
    // console.log(u)
    if (u.id > 0) {
      setLoginSession({ user: u, loggedIn: true })
      window.location.href = websiteURL
    }
  }

  const usersList = users.map((u) => {
    return <p key={`${u.id}`}>{u.username}</p>
  })

  function renderDatetimeAndAuthor(x = { owner: { username: '' }, datetime_created: '' }) {
    console.log(x.owner)
    let edited = ''
    const created = x.datetime_created
    // const name = 'x.owner.username cannot read properties of undefined. reading: username.'
    const name = x.owner.username
    if (x.datetime_last_edited) {
      edited = 'Edited on ' + x.datetime_last_edited + ' | Published on '
    }
    return <p>{edited + created} | {name}</p>

  }



  const commonProps = {
    serverURL: serverURL,
    websiteURL: websiteURL,
    blankUser: blankUser,
    blankComment: blankComment,
    blankPost: blankPost,
    blankPlaylist: blankPlaylist,
    loginSession: loginSession,
    renderDatetimeAndAuthor: renderDatetimeAndAuthor,
    renderTags: renderTags
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home users={users} usersList={usersList} commonProps={commonProps} />,
      children: [],
    },
    {
      path: 'about',
      element: <About />
    },
    {
      path: '/create',
      element: <CreateAndEdit commonProps={commonProps} child={'create'} />
    },
    {
      path: '/edit/:post_id',
      element: <CreateAndEdit commonProps={commonProps} child={'edit'} />
    },
    {
      path: '/view-post/:post_id',
      element: <ViewPost commonProps={commonProps} />
    },
    {
      path: '/view-playlist/:playlist_id',
      element: <ViewPlaylist commonProps={commonProps} />
    },
    {
      path: "/sign-in-or-sign-up",
      element: <SignInOrSignUp users={users} handleUserChange={handleUserChange} login={login} logout={logout} addUser={addUser} commonProps={commonProps} />,
    },
  ]);


  return (
    <div id="app">
      <Header users={users} commonProps={commonProps} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;