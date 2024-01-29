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
    
    serialize_rules = (
        "-posts.owner",  
        '-posts.comments', 
        '-posts.post_tags', 
        '-posts.problem_body',
        '-posts.answer_body',
        '-posts.solution_body',
        '-posts.references',
        '-posts.playlist_posts', 
        '-comments',
        # '-comments.owner', 
        # '-comments.post', 
        # '-comments.parent', 
        # '-comments.children', 
        '-playlists.owner', 
        '-playlists.playlist_posts',
        '-playlists.owner_id',
        '-playlists.datetime_created',
        '-playlists.datetime_last_edited')
    
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
    post_tags = db.relationship('PostTag', backref="post")
    serialize_rules = (
        '-owner.posts',
        '-owner.playlists',
        '-owner.comments',
        '-owner_id',
        '-owner.datetime_created',
        '-owner.email',
        '-playlist_posts.playlist', 
        '-playlist_posts.post', 
        '-comments.post',
        '-comments.owner_id',
        '-comments.owner.id',
        '-comments.owner.email',
        '-comments.owner.datetime_created',
        '-comments.parent',
        # '-comments.children', 
        '-comments.post_id',
        '-post_tags.post',
        '-post_tags.post_id',
        '-post_tags.id',
        '-post_tags.tag.datetime_created',
        '-post_tags.tag_id',
        )

    def __repr__(self):
        return f'Post(id={self.id} owner_id={self.owner_id} title={self.title})'
    
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String(10000))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    parent_id = db.Column(db.Integer,  db.ForeignKey('comments.id'))
    datetime_created = db.Column(db.DateTime, nullable=False)
    datetime_last_edited = db.Column(db.DateTime)

    owner = db.relationship('User', backref='comments')
    post = db.relationship('Post', backref='comments')
    children = db.relationship("Comment", back_populates="parent")
    parent = db.relationship("Comment", back_populates="children", remote_side=[id])

    serialize_rules = (
        '-owner.comments',
        '-owner.posts',
        '-owner.playlists',
        '-owner.id',
        '-owner.datetime_created',
        '-owner.email',
        '-post',
        # '-post.owner' 
        # '-post.comments',
        # '-post.playlist_posts',
        # '-post.post_tags', 
        '-parent.children', 
        '-children.parent')



    def __repr__(self):
        return f'Comment(id={self.id} post_id={self.post_id} body={self.body})'
  
    
class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(40))
    datetime_created = db.Column(db.DateTime, nullable=False)

    post_tags = db.relationship('PostTag', backref='tag')

    serialize_rules = ('-posts_tags.tag',)


    def __repr__(self):
        return f'Tag(id={self.id} tag={self.text})'
    
class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(150))
    datetime_created = db.Column(db.DateTime, nullable=False)
    datetime_last_edited = db.Column(db.DateTime)

    owner = db.relationship('User', backref='playlists')
    # posts = db.relationship('Post', backref='playlists')
    playlist_posts = db.relationship('PlaylistPost', backref="playlist")
    serialize_rules = (
        '-owner.playlists', 
        '-owner.comments',
        '-owner.posts',
        '-owner.id',
        '-owner.datetime_created',
        '-owner.email',
        '-playlist_posts.playlist',
        '-playlist_posts.playlist_id',
        '-playlist_posts.id',
        # '-playlist_posts.post'
        )
    
    def __repr__(self):
        return f'Playlist(id={self.id})'
    
class PostTag(db.Model, SerializerMixin):
    __tablename__ = 'post_tags'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer,  db.ForeignKey('posts.id'), nullable=False)
    tag_id = db.Column(db.Integer,  db.ForeignKey('tags.id'), nullable=False)

    serialize_rules = (
        '-post.post_tags', 
        '-post.owner',
        '-post.comments',
        '-post.playlist_posts',
        '-tag.post_tags')

    def __repr__(self):
        return f'Post_tag(id={self.id})'
    
class PlaylistPost(db.Model, SerializerMixin):
    __tablename__ = 'playlist_posts'



    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer,  db.ForeignKey('posts.id'), nullable=False)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'),  nullable=False)

    serialize_rules = (
        '-post.post_tags', 
        '-post.owner',
        '-post.comments',
        '-post.playlist_posts', 
        '-playlist.owner'
        '-playlist.playlist_posts')

    def __repr__(self):
        return f'Playlist_post(id={self.id})'