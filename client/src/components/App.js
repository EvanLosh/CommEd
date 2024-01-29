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
const webpageURL = "http://127.0.0.1:3000/"
const blankUser = {
  id: -1,
  username: '',
  email: '',
  datetimeCreated: ''
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
        console.log(r)
        if (r) {
          setUsers(r)
        }
      })
  }

  useEffect(fetchUsers, [])

  function handleUserChange(id) {
    id = parseInt(id)
    const u = users.filter(u => u.id === id)[0]
    console.log(u)
    if (u.id > 0) {
      setLoginSession({ user: u, loggedIn: true })
      window.location.href = webpageURL
    }
  }

  const usersList = users.map((u) => {
    return <p key={`${u.id}`}>{u.username}</p>
  })

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home loginSession={loginSession} users={users} serverURL={serverURL} usersList={usersList} />,
      children: [],
    },
    {
      path: 'about',
      element: <About />
    },
    {
      path: '/create-and-edit',
      element: <CreateAndEdit serverURL={serverURL} />
    },
    {
      path: '/view-post/:post_id',
      element: <ViewPost serverURL={serverURL} />
    },
    {
      path: '/view-playlist/:id',
      element: <ViewPlaylist serverURL={serverURL} />
    },
    {
      path: "/sign-in-or-sign-up",
      element: <SignInOrSignUp users={users} handleUserChange={handleUserChange} serverURL={serverURL} loginSession={loginSession} login={login} logout={logout} addUser={addUser} webpageURL={webpageURL} />,
    },
  ]);


  return (
    <div id="app">
      <Header users={users} loginSession={loginSession} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;