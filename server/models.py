from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, backref

db = SQLAlchemy()

# Models 

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    datetime_created = db.Column(db.DateTime, nullable=False)
    
    serialize_rules = ("-posts.owner", '-playlists.owner', '-comments.owner')
    
    def __repr__(self):
        return f'User(id={self.id}, username={self.username})'

    @validates('username')
    def validates_username(self, key, value):
        if not value:
            raise ValueError('Invalid username')
        if len(value) > 20:
            raise ValueError('Username cannot exceed 20 characters')
        return value
    
class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150))
    problem_body = db.Column(db.String(10000))
    answer_body = db.Column(db.String(10000))
    solution_body = db.Column(db.String(10000))
    references  = db.Column(db.String(10000))
    datetime_created = db.Column(db.DateTime, nullable=False)
    datetime_last_edited = db.Column(db.DateTime)

    owner = db.relationship('User', backref="posts")
    tags = db.relationship('PostTag', backref="posts")
    serialize_rules = ('-owner.posts', '-tags.posts', '-playlists.posts', '-comments.post')

    def __repr__(self):
        return f'Post(id={self.id} owner_id={self.owner_id} title={self.title})'
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String(10000))
    # root_comment = db.Column(db.Boolean, nullable=False)
    post_id = db.Column(db.Integer,  db.ForeignKey('posts.id'), nullable=False)
    parent_comment_id = db.Column(db.Integer,  db.ForeignKey('comments.id'), nullable=False)
    datetime_created = db.Column(db.DateTime, nullable=False)
    datetime_last_edited = db.Column(db.DateTime)

    owner = db.relationship('User', backref='comments')
    post = db.relationship('Post', backref='comments')
    parent = db.relationship('Comment', backref=backref('children', remote_side=[id]))
    serialize_rules = ('-owner.comments', '-post.comments', '-parent_comment.children')

    # owner = db.relationship('User', backref="comments")

    def __repr__(self):
        return f'Comment(id={self.id} post_id={self.post_id} body={self.body})'
    
class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(40))
    datetime_created = db.Column(db.DateTime, nullable=False)


    def __repr__(self):
        return f'Tag(id={self.id} tag={self.text})'
    
class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150))
    datetime_created = db.Column(db.DateTime, nullable=False)
    datetime_last_edited = db.Column(db.DateTime, nullable=False)

    owner = db.relationship('User', backref='playlists')
    # posts = db.relationship('Post', backref='playlists')
    playlist_posts = db.relationship('PlaylistPost', backref="playlist")
    serialize_rules = ('-owner.playlists', '-posts.playlists', '-playlist_posts.playlist')
    def __repr__(self):
        return f'Playlist(id={self.id})'
    
class PostTag(db.Model, SerializerMixin):
    __tablename__ = 'post_tags'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer,  db.ForeignKey('posts.id'), nullable=False)
    tag_id = db.Column(db.Integer,  db.ForeignKey('tags.id'), nullable=False)

    def __repr__(self):
        return f'Post_tag(id={self.id})'
    
class PlaylistPost(db.Model, SerializerMixin):
    __tablename__ = 'playlist_posts'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer,  db.ForeignKey('posts.id'), nullable=False)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'),  nullable=False)

    def __repr__(self):
        return f'Playlist_post(id={self.id})'