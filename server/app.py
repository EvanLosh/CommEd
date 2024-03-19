from flask import Flask, request, make_response, session
# from flask_session import Session
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import User, db, Post, Comment, Tag, Playlist
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt import jwt_required, current_identity
# import requests
from datetime import datetime
import bcrypt
import jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key'
# app.config['JWT_AUTH_URL_RULE'] = '/signin'

# def authenticate(username, password):
#     print('authenticating user')
#     user = User.query.filter_by(username=username).first()
#     if not user:
#         return None
#     if bcrypt.checkpw(password.encode('utf-8'), user.password_hash):
#         return user
#     return None

# def identity(payload):
#     user_id = payload['identity']
#     user = User.query.filter_by(id=user_id).first()
#     if user:
#         return user.id
#     return None

# jwt = JWT(app, authenticate, identity)
api = Api(app)
cors = CORS(app, resources={r'/*': {"origins": "*"}})
# configure the database connection to the local file app.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# configure flag to disable modification tracking and use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)

def generate_jwt(user):
    return str(jwt.encode(user.generate_session_data(), 'secret-key', algorithm='HS256'))

def decode_jwt(token):
    return jwt.decode(token, 'secret-key', algorithms=['HS256'])

class SignInResource(Resource):
    def post(self):
        form_data = request.get_json()
        user = User.query.filter_by(username = form_data['username']).first()
        if user:
            password = form_data['password']
            if user.verify_password(password):
                print(generate_jwt(user))
                return {
                    'user': {
                        'username': user.username,
                        'id': user.id,
                        # 'email': user.email,
                        'email_is_verified': user.email_is_verified,
                        'datetime_created': str(user.datetime_created),
                        },
                    'access_token': generate_jwt(user)
                    }, 200
            else:
                return {'message': 'Username or password is incorrect'}, 401
        else:
            return {'message': 'Username or password is incorrect'}, 401


class UsersResource(Resource):
    
    def post(self):
        # create a new user
        form_data = request.get_json()
        password = form_data['password']
        password_bytes = password.encode('utf-8')
        salt = bcrypt.gensalt()
        password_hash = bcrypt.hashpw(password_bytes, salt)
        new_user = User(username=form_data['username'], password_hash=password_hash, email=form_data['email'], email_is_verified=False)
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201
    
class UserResource(Resource):
    # return full details of the specified user 
    @jwt_required()
    def get(self, id):
        user = User.query.filter_by(id = id).first()
        return user.to_dict(), 200


class PostsResource(Resource):
    def get(self):
        # return a list of all posts with only the attributes needed to render cards (no bodies or comments)
        posts = [p.to_dict() for p in Post.query.all()]
        return posts, 200  
    
    @jwt_required()
    def post(self):
        # create a new post
        form_data = request.get_json()
        if form_data['owner_id'] < 1:
            return {'errors': 'Invalid user id'}, 500
        # make a list of the Tag objects
        tags = []
        for t in form_data['tags']:
            # check if a Tag object already exists
            existing_tag = Tag.query.filter_by(text = t['text']).first()
            if existing_tag:
                tags.append(existing_tag)
                # db.session.add(existing_tag)
            else:
                # if no Tag object already exists, create it
                new_tag = Tag(text = t['text'], )
                tags.append(new_tag)
                db.session.add(new_tag)
                # commit one at a time to avoid duplicates
                db.session.commit()
        try:
            newPost = Post(                           tags = tags,
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
    
    @jwt_required()
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
                new_tag = Tag(text = t['text'])
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

    @jwt_required()
    def delete(self, id):
        post = Post.query.filter_by(id = id).first()
        if post:
            db.session.delete(post)
            db.session.commit() 
            return {}, 204
        else: 
            return {}, 404

class CommentsResource(Resource):
    @jwt_required()
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
                newComment = Comment(                           owner_id = form_data['owner_id'],
                           body = form_data['body'],
                           parent_id = form_data['parent_id'],
                           )
            else:
                newComment = Comment(                           owner_id = form_data['owner_id'],
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
    @jwt_required()
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

    @jwt_required()
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
    
    @jwt_required()
    def post(self):
        # Create a new playlist
        form_data = request.get_json()
        first_post = Post.query.filter_by(id = form_data['post_id']).first()
        new_playlist = Playlist(owner_id = form_data['owner_id'], title = form_data['title'], posts = [first_post])
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
    
    @jwt_required()
    def patch(self, id):
        # Add or remove a post to a playlist
        form_data = request.get_json()
        playlist = Playlist.query.filter_by(id = id).first()
        if not playlist:
            return {}, 404
        if form_data['action'] == 'add':
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
        elif form_data['action'] == 'remove':
            post_ids = [p.id for p in playlist.posts]
            if form_data['post_id'] not in post_ids:
                return {}, 404
            post_to_be_removed = Post.query.filter_by(id = form_data['post_id']).first()
            if post_to_be_removed:
                playlist.posts.remove(post_to_be_removed)     
                db.session.add(playlist)
                db.session.commit()
                return playlist.to_dict(), 200
            else:
                return {}, 404      
    
    @jwt_required()
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
    
    # DO NOT make an endpoint for creating new tags
    # New tags are created when a post is created or edited

    

api.add_resource(UsersResource, '/users') # Post
api.add_resource(UserResource, '/users/<int:id>') # Get
api.add_resource(PostsResource, '/posts') # Get, Post
api.add_resource(PostResource, '/posts/<int:id>') # Get, Patch, Delete
api.add_resource(CommentsResource, '/comments') # Post
api.add_resource(CommentResource, '/comments/<int:id>') # Patch, Delete
api.add_resource(PlaylistsResource, '/playlists') # Get, Post
api.add_resource(PlaylistResource, '/playlists/<int:id>') # Get, Patch, Delete
# api.add_resource(TagsResource, '/tags') # Get
api.add_resource(SignInResource, '/signin') # Post


if __name__ == "__main__":
    app.run(debug=True)