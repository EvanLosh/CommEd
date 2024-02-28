# CommEd
Write solutions to math problems with professional quality typesetting, or share and discuss solutions with the world. CommEd offers convenience and enrichment for teachers and students who solve math problems.

This full-stack web app was my capstone project for Flatiron School's bootcamp for software engineering. It uses React on the front-end and Flask on the back-end, and it uses the node package react-tex to render TeX typesetting.

# How to run this app
 
In a terminal in the project directory:

    pipenv install
    pipenv shell
    cd server
    python seed.py # Creates the database and enters some data
    python app.py

In a second terminal in the project directory:

    cd client
    npm install
    npm run start


<!-- # User stories
   * User can post a math problem with an answer, a solution, and references.
   * Post are written in markdown, with TeX-styled equations, and links to graphics.
   * User can edit their posts.
   * User can view other users' posts.
   * User can search for posts, filter posts, and sort posts. 
   * User can comment on posts.
   * User can reply to comments.
   * User can save posts to a new playlist or an existing playlist. -->


# React component tree

![React component tree](CommEd-react-tree.png)

# React routes

| React routes | component |
|--- | --- |
| / | Home.js |
| /sign-in-or-sign-up | SignUpOrSignIn.js |
| /about | About.js |
| /posts | Posts.js |
| /playlists | Playlist.js |
| /create | CreateAndEditPost.js |
| /edit-post/:id | CreateAndEditPost.js |
| /view-post/:id | ViewPost.js |
| /playlist/:id | PlaylistFetcher.js |

# Database schema, relationships

<img width="798" alt="CommEd-db-schema" src="https://github.com/EvanLosh/CommEd/assets/134793412/644fcf45-3121-42ef-87fb-1954ce35b9e5">


# API routes 

| Verb | Endpoint | Purpose | Response structure |
| --- | --- | --- | --- |
| POST | /sign-in | user signs in (This is being replaecd with implementation of user account security and privacy) | a user object |
| POST | /users | Create a new user account | a user object |
| GET | /posts | Render cards for posts | a list of post objects |
| GET | /posts/int:id | View a post | a post object |
| POST | /posts | Submit a new post | a post object |
| PATCH | /posts/int:id | Edit a post | a post object |
| DELETE | /posts/int:id | Delete a post | an empty object |
| POST | /comments | Submit a comment to a post| a comment object | 
| PATCH | /comments/int:id | Edit a comment | a comment object |
| DELETE | /comments/int:id | Delete at comment | an empty object | 
| GET | /playlists | Get a list of playlists | a list of playlist 
objects |
| POST | /playlists | Create a new playlist | a playlist object |
| GET | /playlists/int:id | Get a playlist by id | a playlist object |
| PATCH | /playlists/int:id | Add or remove a post to a playlist | a playlist object |
| DELETE | /playlists/int:id | Delete a playlist | an empty object |



<!-- | GET | /posts/int:id/comments | Render the comments on a post | a list of comments | -->
<!-- | GET | /tags | Get a list of all tags | a list of tag objects |
| POST | /tags | Create a new tag | a tag object | -->
<!-- | GET | /posts/int:id/tags | Get a list tags on a post | a list of tag objects |
| POST | /posts/int:id/tags | Add a tag to a post | a tag object |
| DELETE | /posts/int:id/tags/int:id | Remove a tag from a post | an empty object | -->
<!-- | GET | /users | Show the owners of posts and comments | a list of user objects | -->
<!-- | GET | /users/int:id | Get a user by id | a user object | -->





# Kanban board



<img width="632" alt="Phase-5-kanban-board" src="https://github.com/EvanLosh/CommEd/assets/134793412/0719b7f0-644d-45bc-b90e-d84efbd5e771">

