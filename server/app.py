from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import User, db, Post, Comment, Tag, Playlist
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
from datetime import datetime

app = Flask(__name__)
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

class UsersResource(Resource):
    def get(self):
        # return a list of all users
        users = [u.to_dict() for u in User.query.all()]
        return users, 200
    
    def post(self):
        # create a new user
        # form data includes: username, email
        form_data = request.get_json()
        new_user = User(username=form_data['username'], email=form_data['email'], datetime_created=datetime.now())
        db.session.add(new_user)
        db.session.commit()
        return new_user, 201
    
    def put(self):
        # update username or email
        # form data includes at least one: username, email
        return {}
    
class UserResource(Resource):
    # return full details of the specified user 
    def get(self, id):
        users = [u.to_dict() for u in User.query.all()]
        return users, 200


# class SignInResource(Resource):
#     def get(self):
#         users = [u.to_dict() for u in User.query.all()]
#         return users, 200
    
#     def post(self):
#         form_data = request.get_json()
#         new_user = User(username=form_data['username'], email=form_data['email'], datetime_created=datetime.now())
#         db.session.add(new_user)
#         db.session.commit()
#         return new_user, 201

class PostsResource(Resource):
    def get(self):
    # return a list of all posts with only the attributes needed to render cards (no bodies or comments)
        posts = [p.to_dict() for p in Post.query.all()]
        return posts, 200  

class PostResource(Resource):
    def get(self, id):
    # return complete data of a specified post
        post = Post.query.filter_by(id=id).first().to_dict()
        return post, 200  

class CommentResource(Resource):
    def get(self, root,  id):
        # ?
        post = Post.query.filter_by(id=id).first().to_dict()
        return post, 200   
    
    def post(self, root, id):
        # create a new comment. root is boolean: true means the comment is a reply to a post; false means it is a reply to a comment. id is the id of the parent post or comment.
        return {}
    
    def put(self, id):
        # update the body of a comment
        return {}
    
    def delete(self, id):
        # delete a comment 
        return {}


class PlaylistsResource(Resource):
    def get(self):
        # return a list of all playlists
        playlists = [p.to_dict() for p in Playlist.query.all()]
        return playlists, 200
    
    def post(self):
        # create a new playlist
        return {}

class PlaylistResource(Resource):
    def get(self, id):
    # return complete details of a specified playlist
        playlists = [p.to_dict() for p in Playlist.query.all()]
        return playlists, 200
    
    def put(self, id):
        # update a playlist
        return {}
    
    def delete(self, id):
        # delete a playlist
        return {}



# class PostResource(Resource):
#     def get(self, id):
#         post = Post.query.filter_by(id = id).first().to_dict()
#         return post, 200    
    

api.add_resource(UsersResource, '/users')
api.add_resource(UserResource, '/users/<int:id>')
api.add_resource(PostsResource, '/posts')
api.add_resource(PostResource, '/posts/<int:id>')
api.add_resource(PlaylistsResource, '/playlists')
api.add_resource(PlaylistResource, '/playlists/<int:id>')
api.add_resource(CommentResource, '/comment/<string:root>/<int:id>')
# api.add_resource(SignInResource, '/signin')


if __name__ == "__main__":
    app.run(debug=True)