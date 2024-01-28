import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NewUserForm from "./NewUserForm";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";

const serverURL = "http://127.0.0.1:5000";
const blankUser = {
  id: -1,
  username: '',
  email: '',
  datetimeCreated: ''
}

function App() {
  const [users, setUsers] = useState([blankUser])

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

  const usersList = users.map((u) => {
    return <p key={`${u.id}`}>{u.username}</p>
  })

  return (
    <div id="app">
      <h1>App.js</h1>
      {usersList}
    </div>
  );
}

export default App;