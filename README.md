# CommEd
Write your own math problems and solutions with MathJax and vector graphics, share them with the world, and learn from other users.

1. A SCREENSHOT of your wireframe

<img width="848" alt="Phase-5-home" src="https://github.com/EvanLosh/CommEd/assets/134793412/7f27938a-543e-4a08-853c-d986c8c9736a">

<img width="851" alt="Phase-5-new-post" src="https://github.com/EvanLosh/CommEd/assets/134793412/3e6c0e5b-b778-4933-96fe-a594bf76b91e">

<img width="846" alt="Phase-5-view-post" src="https://github.com/EvanLosh/CommEd/assets/134793412/f613c0c4-7089-476a-b80d-e32332bafb62">


2. User stories
   * User can post a math problem with an answer, a solution, and references.
   * Post bodies can include markdown, styled equations, and links to graphics
   * User can edit their posts.
   * User can view other users' posts.
   * User can search for posts by substrings.
   * User can comment on posts.
   * User can reply to comments.
   * User can save playlists of posts.

3. A SCREENSHOT of a React tree diagram

<img width="790" alt="Phase-5-React-Tree" src="https://github.com/EvanLosh/CommEd/assets/134793412/2c6fb4f6-c9c4-4d5d-a4e6-ecab6a361083">


4. A list of your React Router ROUTES and the component it will go to

| React routes | component |
|--- | --- |
| / | <Home /> |
| /about | <About /> |

6. A SCREENSHOT of your schema (includes relationships, columns, validations)

<img width="830" alt="CommEd database schema" src="https://github.com/EvanLosh/CommEd/assets/134793412/ef0c5e95-34f3-44d1-8cd8-9f5d3077b2a2">

7. A list of your API routes (HTTP Verb, Endpoint, Purpose, Response Structure)

| Verb | Endpoint | Purpose | Response structure |
| --- | --- | --- | --- |
| GET| /users | | |
| POST| /users| | |
|GET|/posts/|||
|GET|/posts/<int:id>|||
|POST|/posts|||
|PATCH|/posts/<int:id>|||
|DELETE|/posts/<int:id>|||
||/comments|||
||/playlists|||

8. What new technologies you will use (Redux and useContext will count)
   * MathJax

9. Three stretch goals
    * User can like posts and can see how many likes each post has.
    * User can preview their post before submitting it
    * User can make custom graphics (relevant to math problems) for their post

11. A Kanban board
