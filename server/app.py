from flask import Flask, request, make_response, session
# from flask_session import Session
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import User, db, Post, Comment, Tag, Playlist
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
# app.secret_key = 
api = Api(app)
cors = CORS(app, resources={r'/*': {"origins": "*"}})
# configure the database connection to the local file app.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# configure flag to disable modification tracking and use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Session(app)

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)

class SignInResource(Resource):

    def post(self):
        # TODO: This is not RESTful. replace this endpoint with one that gets a user by using the username as a route parameter.
        form_data = request.get_json()
        print(form_data)
        user = User.query.filter_by(username = form_data['username']).first()
        print(user)
        if user:
            return user.to_dict(), 200
        else:
            return {}, 200


class UsersResource(Resource):
    
    def post(self):
        # create a new user
        form_data = request.get_json()
        new_user = User(username=form_data['username'], email=form_data['email'], datetime_created=datetime.now())
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201
    
class UserResource(Resource):
    # return full details of the specified user 
    def get(self, id):
        user = User.query.filter_by(id = id).first()
        return user.to_dict(), 200


class PostsResource(Resource):
    def get(self):
        # return a list of all posts with only the attributes needed to render cards (no bodies or comments)
        posts = [p.to_dict() for p in Post.query.all()]
        return posts, 200  
    
    def post(self):
        # create a new post
        form_data = request.get_json()
        print(form_data)
        if form_data['owner_id'] < 1:
            return {'errors': 'Invalid user id'}, 500
        try:
            newPost = Post(datetime_created = datetime.now(),
                           owner_id = form_data['owner_id'],
                           title = form_data['title'],
                           problem_body = form_data['problem_body'],
                           answer_body = form_data['answer_body'],
                           solution_body = form_data['solution_body'],
                           references = form_data['references']
                           )
            db.session.add(newPost)
            db.session.commit()
            return newPost.to_dict(), 201
        except:
            return {'errors': 'failed to create an instance of calss Post'}, 500
        return {'errors': 'idk'}, 500

class PostResource(Resource):
    def get(self, id):
    # return complete data of a specified post
        post = Post.query.filter_by(id=id).first()
        if post:
            return post.to_dict(), 200  
        else:
            return {}, 404
    
    def patch(self, id):
        # post = Post.query.filter_by(id = id).first()
        post = Post.query.get_or_404(id)
        
        form_data = request.get_json()
        # make a list of the Tag objects
        tags = []
        for t in form_data['tags']:
            # check if a Tag object already exists
            existing_tag = Tag.query.filter_by(text = t['text']).first()
            if existing_tag:
                tags.append(existing_tag)
                db.session.add(existing_tag)
            else:
                # if no Tag object already exists, create it
                new_tag = Tag(text = t['text'], datetime_created = datetime.now())
                tags.append(new_tag)
                db.session.add(new_tag)
            # commit one at a time to avoid duplicates
            db.session.commit()
        
        # post = Post.query.filter_by(id = id).first()
        if 'title' in form_data:
            post.title = form_data['title']
        if 'problem_body' in form_data:
            post.problem_body = form_data['problem_body']
        if 'answer_body' in form_data:
            post.answer_body = form_data['answer_body']
        if 'solution_body' in form_data:
            post.solution_body = form_data['solution_body']
        if 'references' in form_data:
            post.references = form_data['references']
        if 'status' in form_data:
            post.status = form_data['status']
        if 'tags' in form_data:
            post.tags = tags
        post.datetime_last_edited = datetime.now()
        db.session.add(post)
        db.session.commit()
        return post.to_dict(), 200
        # else:
        #     return {}, 404
        # print(form_data)

    def delete(self, id):
        post = Post.query.filter_by(id = id).first()
        if post:
            db.session.delete(post)
            db.session.commit() 
            return {}, 204
        else: 
            return {}, 404

class CommentsResource(Resource):
    def post(self):
        # create a new comment
        form_data = request.get_json()
        print(form_data)
        if form_data['owner_id'] < 1:
            return {'errors': 'Invalid user id'}, 500
        try:
            if form_data['parent_id']:
                # a comment must have either a parent_id or a post_id, not both
                # a not-None parent_id makes the comment a child of another comment
                newComment = Comment(datetime_created = datetime.now(),
                           owner_id = form_data['owner_id'],
                           body = form_data['body'],
                           parent_id = form_data['parent_id'],
                           )
            else:
                newComment = Comment(datetime_created = datetime.now(),
                           owner_id = form_data['owner_id'],
                           body = form_data['body'],
                           post_id = form_data['post_id'],
                           )
            db.session.add(newComment)
            db.session.commit()
            return newComment.to_dict(), 201
        except:
            return {'errors': 'failed to create an instance of calss Comment'}, 500
        return {'errors': 'idk'}, 500
    

class CommentResource(Resource): 
    
    def patch(self, id):
        # update the body of a comment
        form_data = request.get_json()
        new_body = form_data['body']
        comment = Comment.query.filter_by(id = id).first()
        if comment:
            comment.body = new_body
            db.session.commit()
            return comment.to_dict(), 200
        else:
            return {}, 404

    
    def delete(self, id):
        # delete a comment
        comment = Comment.query.filter_by(id = id).first()
        db.session.delete(comment)
        db.session.commit() 
        return {}, 204


class PlaylistsResource(Resource):
    def get(self):
        # return a list of all playlists
        playlists = [p.to_dict() for p in Playlist.query.all()]
        return playlists, 200
    
    def post(self):
        # Create a new playlist
        form_data = request.get_json()
        first_post = Post.query.filter_by(id = form_data['post_id']).first()
        new_playlist = Playlist(owner_id = form_data['owner_id'], title = form_data['title'], posts = [first_post], datetime_created = datetime.now())
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict(), 201

class PlaylistResource(Resource):
    def get(self, id):
        # return complete details of a specified playlist
        playlist = Playlist.query.filter_by(id = id).first()
        if playlist:
            return playlist.to_dict(), 200
        else:
            return {}, 404
    
    def patch(self, id):
        # Add or remove a post to a playlist
        form_data = request.get_json()

        playlist = Playlist.query.filter_by(id = id).first()
        if not playlist:
            return {}, 404
        post_ids = [p.id for p in playlist.posts]
        if form_data['post_id'] in post_ids:
            return playlist.to_dict(), 200
        new_post = Post.query.filter_by(id = form_data['post_id']).first()
        if new_post:
            playlist.posts.append(new_post)
            db.session.add(playlist)
            db.session.commit()
            return playlist.to_dict(), 200
        else:
            return {}, 404
    
    def delete(self, id):
        # delete a playlist
        playlist = Playlist.query.filter_by(id = id).first()
        if playlist:
            db.session.delete(playlist)
            db.session.commit()
            return {}, 204
        return {}, 404
  
class TagsResource(Resource):
    def get(self):
        # return a list of all playlists
        tags = [t.to_dict() for t in Tag.query.all()]
        return tags, 200
    
    # Tags are created when creating or editing posts

    

api.add_resource(UsersResource, '/users') # Post
api.add_resource(UserResource, '/users/<int:id>') # Get
api.add_resource(PostsResource, '/posts') # Get, Post
api.add_resource(PostResource, '/posts/<int:id>') # Get, Patch, Delete
api.add_resource(CommentsResource, '/comments') # Post
api.add_resource(CommentResource, '/comments/<int:id>') # Patch, Delete
api.add_resource(PlaylistsResource, '/playlists') # Get, Post
api.add_resource(PlaylistResource, '/playlists/<int:id>') # Get, Patch, Delete
api.add_resource(TagsResource, '/tags') # Get
api.add_resource(SignInResource, '/signin') # Post


if __name__ == "__main__":
    app.run(debug=True)