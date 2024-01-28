from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import User, db, Post, Comment, Tag, Playlist, PostTag, PlaylistPost
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
        users = [u.to_dict() for u in User.query.all()]
        print(users)
        return users, 200
    
    def post(self):
        form_data = request.get_json()
        new_user = User(**form_data)
        db.session.add(new_user)
        db.session.commit()
        return new_user, 201

class PostsResource(Resource):
    def get(self):
        posts = [p.to_dict() for p in Post.query.all()]
        return posts, 200   

class PostResource(Resource):
    def get(self, id):
        post = Post.query.filter_by(id = id).first().to_dict()
        return post, 200    
    

api.add_resource(UsersResource, '/users')
api.add_resource(PostsResource, '/posts')
api.add_resource(PostResource, '/posts/<int:id>')


if __name__ == "__main__":
    app.run(debug=True)