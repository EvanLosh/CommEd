# CommEd
Write your own math problems and solutions with MathJax, share them with the world, and learn from other users.

1. A SCREENSHOT of your wireframe

<img width="848" alt="Phase-5-home" src="https://github.com/EvanLosh/CommEd/assets/134793412/7f27938a-543e-4a08-853c-d986c8c9736a">

<img width="851" alt="Phase-5-new-post" src="https://github.com/EvanLosh/CommEd/assets/134793412/3e6c0e5b-b778-4933-96fe-a594bf76b91e">

<img width="846" alt="Phase-5-view-post" src="https://github.com/EvanLosh/CommEd/assets/134793412/f613c0c4-7089-476a-b80d-e32332bafb62">


2. User stories
   * User can post a math problem with an answer, a solution, and references.
   * Post are written in markdown, with TeX-styled equations, and links to graphics.
   * User can edit their posts.
   * User can view other users' posts.
   * User can search for posts, filter posts, and sort posts. 
   * User can comment on posts.
   * User can reply to comments.
   * User can save posts to a new playlist or an existing playlist.

3. A SCREENSHOT of a React tree diagram

<img width="918" alt="Phase-5-React-Tree-2" src="https://github.com/EvanLosh/CommEd/assets/134793412/cbcd61df-00e7-4ae8-a9bb-e31238043a40">

4. A list of your React Router ROUTES and the component it will go to

| React routes | component |
|--- | --- |
| / | Home.js |
| /about | About.js |
| /new-post | CreateAndEdit.js |
| /view-post/:id | ViewPost.js |
| /sign-in | SignUpOrSignIn.js |
| /playlist/:id | Playlist.js |

6. A SCREENSHOT of your schema (includes relationships, columns, validations)

<img width="830" alt="CommEd database schema" src="https://github.com/EvanLosh/CommEd/assets/134793412/ef0c5e95-34f3-44d1-8cd8-9f5d3077b2a2">

7. A list of your API routes (HTTP Verb, Endpoint, Purpose, Response Structure)

| Verb | Endpoint | Purpose | Response structure |
| --- | --- | --- | --- |
| GET | /users | Get all usernames and ids | a list of user objects |
| POST | /users| Create a new user account | a user object |
| GET | /users/int:id | Get a username by id | a user object |
| GET | /posts | Get all posts matching search and filter criteria in the request body | a list of posts (Only the attributes needed for front-end cards) |
| GET | /posts/<int:id> | Get a post by its id | a post object |
| POST | /posts | Submit a new post | a post object |
| PATCH | /posts/<int:id> | Edit a post | a post object |
| DELETE | /posts/<int:id> | Delete a post | an empty object |
| GET | /posts/int:id/comments | Get the comments on a post | a list of comments |
| POST | /post/int:id/comments | Submit a comment to a post| a comment object |
| PATCH | /posts/int:id/comments/int:id | Edit a comment | a comment object |
| DELETE | /post/int:id/comments/int:id | Delete at comment | an empty object |
| GET | /playlists | Get a list of playlists matching search and filter options | a list of playlist objects |
| POST | /playlists | Create a new playlist | a playlist object |
| GET | /playlists/int:id | Get a playlist by id | a playlist object |
| PATCH | /playlists/int:id | Alter a playlist | a playlist object |
| DELETE | /playlists/int:id | Delete a playlist ||

8. What new technologies you will use (Redux and useContext will count)
   * MathJax
   * markdown-to-jsx

9. Three stretch goals
    * User can favorite posts and see a list of their favorites.
    * User can like posts and can see how many likes each post has.
    * User can preview their post before submitting it.
    * User can make custom graphics (relevant to math problems) and include them in their post.

11. A Kanban board

<img width="632" alt="Phase-5-kanban-board" src="https://github.com/EvanLosh/CommEd/assets/134793412/0719b7f0-644d-45bc-b90e-d84efbd5e771">

